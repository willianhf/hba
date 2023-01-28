import { IUseCase, ValidationError } from '~/shared/core';
import { Actor, DiscordActor, DiscordActorId } from '../domain';
import { ActorRepository, DiscordActorRepository } from '../repos';

interface CreateDiscordActorDTO {
  habboUsername: string;
  discordId: string;
}

type CreateDiscordActorResult = DiscordActor;

export class CreateDiscordActorUseCase implements IUseCase<CreateDiscordActorDTO, CreateDiscordActorResult> {
  constructor(
    private readonly actorRepository: ActorRepository,
    private readonly discordActorRepository: DiscordActorRepository
  ) {}

  async execute(dto: CreateDiscordActorDTO): Promise<DiscordActor> {
    let actor = await this.actorRepository.findByHabboUsername(dto.habboUsername);
    if (!actor) {
      actor = new Actor({ habboUsername: dto.habboUsername });
      await this.actorRepository.create(actor);
    }

    let discordActor = await this.discordActorRepository.findById(new DiscordActorId(dto.discordId));
    if (!discordActor) {
      discordActor = new DiscordActor({ actor, discordId: dto.discordId });
      await this.discordActorRepository.create(discordActor);
    } else {
      throw new ValidationError('Você já está cadastrado');
    }

    if (discordActor.discordId !== dto.discordId) {
      throw new ValidationError('Esse usuário já está associada a outra conta');
    }

    return discordActor;
  }
}
