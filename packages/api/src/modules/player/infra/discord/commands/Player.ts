import { ApplicationCommandOptionType, AutocompleteInteraction, CommandInteraction, User } from 'discord.js';
import { Discord, Guard, Slash, SlashGroup, SlashOption } from 'discordx';
import { DiscordActorFacade } from '~/modules/auth/infra/discord/facades/DiscordActor';
import { DiscordRoleCategory } from '~/modules/discord/domain';
import { RoleGuard } from '~/modules/discord/infra/discord/guards';
import { ApprovalStatus, Icon, IconCategory, Player, Position } from '~/modules/player/domain';
import { NBAAPIFacade } from '~/modules/player/facades/NBAAPI';
import {
  prismaIconRepository,
  prismaPlayerRepository,
  prismaPositionRepository
} from '~/modules/player/repos/impl/Prisma';
import { applyPlayerUseCase } from '~/modules/player/useCases/ApplyPlayer';
import { changePlayerStatusUseCase } from '~/modules/player/useCases/ChangePlayerStatus';
import { updatePlayerUseCase } from '~/modules/player/useCases/UpdatePlayer';
import { prismaSeasonRepository } from '~/modules/season/repos';
import { InMemoryCache, Pagination, ValidationError } from '~/shared/core';
import { UniqueIdentifier } from '~/shared/domain';
import { MessageBuilder } from '~/shared/infra/discord';
import { updatePlayerInfoUseCase } from '../useCases';

const APPLICATIONS_PAGE_SIZE = 20;

@Discord()
@SlashGroup({
  name: 'player',
  description: 'Gerencia os jogadores'
})
@SlashGroup('player')
export class PlayerCommands {
  private readonly cache = new InMemoryCache();

  public constructor() {
    this.fetchPositions();
    this.fetchPrimaryIcons();
    this.fetchSecondaryIcons();
    this.fetchApplications(ApprovalStatus.IDLE);
  }

  private async fetchApplications(status: ApprovalStatus): Promise<void> {
    const season = await prismaSeasonRepository.findCurrent();
    const applications = await prismaPlayerRepository.findByStatus(season.id, status);

    this.cache.set(`applications:${status}`, applications);
    this.cache.set(`applications:${status}:pages`, Pagination.totalPages(applications, APPLICATIONS_PAGE_SIZE));
  }

  private async ensureCache(status: ApprovalStatus): Promise<void> {
    if (!this.cache.has(`applications:${status}`)) {
      await this.fetchApplications(status);
    }
  }

  private async getApplications(status: ApprovalStatus): Promise<Player[]> {
    await this.ensureCache(status);

    return this.cache.getOr<Player[]>(`applications:${status}`, []); 
  }

  private async getApplicationsBySearch(status: ApprovalStatus, search: string | null): Promise<Player[]> {
    await this.ensureCache(status);

    const applications = await this.getApplications(status);
    if (search) {
      return applications
        .filter(player => player.actor.habboUsername.toLowerCase().includes(search.toLowerCase()))
        .slice(0, APPLICATIONS_PAGE_SIZE);
    }

    return Pagination.paginate(applications, 0, APPLICATIONS_PAGE_SIZE);
  }

  private async fetchPositions(): Promise<void> {
    const positions = await prismaPositionRepository.findAll();
    this.cache.set('positions', positions);
  }

  private async fetchPrimaryIcons(): Promise<void> {
    const icons = await prismaIconRepository.findByCategory(IconCategory.PRIMARY);
    this.cache.set('icons:primary', icons);
  }

  private async fetchSecondaryIcons(): Promise<void> {
    const icons = await prismaIconRepository.findByCategory(IconCategory.SECONDARY);
    this.cache.set('icons:secondary', icons);
  }

  private buildPlayersList(applications: Player[]): string[] {
    const biggestUsername = Math.max(...applications.map(application => application.actor.habboUsername.length));
    const biggestNBAPlayer = Math.max(...applications.map(application => application.nbaPlayer.name.length));

    return applications.map(application => {
      const username = application.actor.habboUsername.padEnd(biggestUsername, ' ');
      const nbaPlayer = application.nbaPlayer.name.padEnd(biggestNBAPlayer, ' ');
      const position = application.position.id.toValue().padEnd(2, ' ');
      const primaryIcon = application.icons.primaryIcon.id.toValue();
      const secondaryIcon = application.icons.secondaryIcon.id.toValue();

      return `${username} | ${nbaPlayer} | ${position} | ${primaryIcon} & ${secondaryIcon}`;
    });
  }

  @Slash({ description: 'Inscreve jogador do usuário para a temporada' })
  @Guard(RoleGuard([DiscordRoleCategory.MOD]))
  async add(
    @SlashOption({
      description: 'Usuário',
      name: 'user',
      type: ApplicationCommandOptionType.User,
      required: true
    })
    user: User,
    @SlashOption({
      description: 'Jogador da NBA',
      name: 'nba_player',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async (interaction: AutocompleteInteraction) => {
        const input = interaction.options.getString('nba_player');
        if (!input) {
          interaction.respond([]);
          return;
        }

        try {
          const nbaPlayers = await NBAAPIFacade.fetchPlayersByName(input);
          interaction.respond(
            nbaPlayers.map(nbaPlayer => ({
              name: nbaPlayer.name,
              value: nbaPlayer.id.toValue()
            }))
          );
        } catch (ex) {
          interaction.respond([]);
        }
      }
    })
    nbaPlayerId: string,
    @SlashOption({
      description: 'Posição',
      name: 'position_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: PlayerCommands, interaction: AutocompleteInteraction) {
        const positions = this.cache.getOr<Position[]>('positions', []);
        interaction.respond(positions.map(position => ({ name: position.name, value: position.id.toValue() })));
      }
    })
    positionId: string,
    @SlashOption({
      description: 'Ícone primário',
      name: 'primary_icon_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: PlayerCommands, interaction: AutocompleteInteraction) {
        const icons = this.cache.getOr<Icon[]>('icons:primary', []);
        interaction.respond(icons.map(icon => ({ name: icon.name, value: icon.id.toValue() })));
      }
    })
    primaryIconId: string,
    @SlashOption({
      description: 'Ícone secundário',
      name: 'secondary_icon_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: PlayerCommands, interaction: AutocompleteInteraction) {
        const icons = this.cache.getOr<Icon[]>('icons:secondary', []);
        interaction.respond(icons.map(icon => ({ name: icon.name, value: icon.id.toValue() })));
      }
    })
    secondaryIconId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await interaction.deferReply({ ephemeral: true });

      const discordActor = await DiscordActorFacade.findOrRegister(user, interaction.guild);

      await applyPlayerUseCase.execute({
        actor: discordActor.actor,
        nbaPlayerId: new UniqueIdentifier(nbaPlayerId),
        positionId: new UniqueIdentifier(positionId),
        iconsIds: [new UniqueIdentifier(primaryIconId), new UniqueIdentifier(secondaryIconId)]
      });

      this.cache.invalidate('applications');

      interaction.editReply(new MessageBuilder('Inscrição efetuado com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        interaction.editReply(
          new MessageBuilder('Algo deu errado, entre em contato com um administrador').kind('ERROR').build()
        );
        console.error(ex);
      }
    }
  }

  @Slash({ description: 'Remove inscrição aprovada de jogador na temporada atual' })
  @Guard(RoleGuard([DiscordRoleCategory.MOD]))
  async remove(
    @SlashOption({
      description: 'Inscrição',
      name: 'player_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: PlayerCommands, interaction: AutocompleteInteraction) {
        const input = interaction.options.getString('player_id');
        const applications = await this.getApplicationsBySearch(ApprovalStatus.ACCEPTED, input);
        const playersList = await this.buildPlayersList(applications);

        interaction.respond(
          playersList.map((player, index) => ({
            name: player,
            value: applications[index].id.toValue()
          }))
        );
      }
    })
    playerId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await changePlayerStatusUseCase.execute({
        playerId: new UniqueIdentifier(playerId),
        status: ApprovalStatus.DENIED
      });

      this.cache.invalidate('applications');

      interaction.reply(new MessageBuilder('Inscrição do jogador removida com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.reply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        interaction.reply(
          new MessageBuilder('Algo deu errado, entre em contato com um administrador').kind('ERROR').build()
        );
        console.error(ex);
      }
    }
  }

  @Slash({ description: 'Gera a lista de jogadores da temporada' })
  @Guard(RoleGuard([DiscordRoleCategory.MOD]))
  async generate(interaction: CommandInteraction): Promise<void> {
    try {
      await interaction.deferReply({ ephemeral: true });

      await updatePlayerInfoUseCase.execute();

      interaction.editReply(new MessageBuilder('Lista de jogadores gerada com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        interaction.editReply(
          new MessageBuilder('Algo deu errado, entre em contato com um administrador').kind('ERROR').build()
        );
        console.error(ex);
      }
    }
  }

  @Slash({ description: 'Edita inscrição de jogador' })
  @Guard(RoleGuard([DiscordRoleCategory.MOD]))
  async edit(
    @SlashOption({
      description: 'Inscrição',
      name: 'application_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: PlayerCommands, interaction: AutocompleteInteraction) {
        const input = interaction.options.getString('application_id') ?? '';
        const applications = await this.getApplicationsBySearch(ApprovalStatus.ACCEPTED, input);
        const list = this.buildPlayersList(applications);

        interaction.respond(list.map((name, index) => ({ name: name, value: applications[index].id.toValue() })));
      }
    })
    applicationId: string,
    @SlashOption({
      description: 'Jogador da NBA',
      name: 'nba_player',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async (interaction: AutocompleteInteraction) => {
        const input = interaction.options.getString('nba_player');
        if (!input) {
          interaction.respond([]);
          return;
        }

        try {
          const nbaPlayers = await NBAAPIFacade.fetchPlayersByName(input);
          interaction.respond(
            nbaPlayers.map(nbaPlayer => ({
              name: nbaPlayer.name,
              value: nbaPlayer.id.toValue()
            }))
          );
        } catch (ex) {
          interaction.respond([]);
        }
      }
    })
    nbaPlayerId: string,
    @SlashOption({
      description: 'Posição',
      name: 'position_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: PlayerCommands, interaction: AutocompleteInteraction) {
        const positions = this.cache.getOr<Position[]>('positions', []);
        interaction.respond(positions.map(position => ({ name: position.name, value: position.id.toValue() })));
      }
    })
    positionId: string,
    @SlashOption({
      description: 'Ícone primário',
      name: 'primary_icon_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: PlayerCommands, interaction: AutocompleteInteraction) {
        const icons = this.cache.getOr<Icon[]>('icons:primary', []);
        interaction.respond(icons.map(icon => ({ name: icon.name, value: icon.id.toValue() })));
      }
    })
    primaryIconId: string,
    @SlashOption({
      description: 'Ícone secundário',
      name: 'secondary_icon_id',
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: async function (this: PlayerCommands, interaction: AutocompleteInteraction) {
        const icons = this.cache.getOr<Icon[]>('icons:secondary', []);
        interaction.respond(icons.map(icon => ({ name: icon.name, value: icon.id.toValue() })));
      }
    })
    secondaryIconId: string,
    interaction: CommandInteraction
  ): Promise<void> {
    try {
      await interaction.deferReply({ ephemeral: true });

      const players = await this.getApplications(ApprovalStatus.ACCEPTED);
      const player = players.find(player => player.id.toValue() === applicationId);
      if (!player) {
        throw new ValidationError('Jogador informado não encontrado');
      }

      await updatePlayerUseCase.execute({
        player,
        nbaPlayerId: new UniqueIdentifier(nbaPlayerId),
        positionId: new UniqueIdentifier(positionId),
        iconsIds: [new UniqueIdentifier(primaryIconId), new UniqueIdentifier(secondaryIconId)]
      });

      this.cache.invalidate('applications');

      interaction.editReply(new MessageBuilder('Inscrição editada com sucesso').kind('SUCCESS').build());
    } catch (ex) {
      if (ex instanceof ValidationError) {
        interaction.editReply(new MessageBuilder(ex.message).kind('ERROR').build());
      } else {
        interaction.editReply(
          new MessageBuilder('Algo deu errado, entre em contato com um administrador').kind('ERROR').build()
        );
        console.error(ex);
      }
    }
  }
}
