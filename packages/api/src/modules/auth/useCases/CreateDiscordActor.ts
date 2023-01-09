import { IUseCase } from '~/shared/core';
import { Actor, DiscordActor } from '../domain';
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
    const actor = new Actor({ habboUsername: dto.habboUsername });
    await this.actorRepository.create(actor);

    const discordActor = new DiscordActor({ actorId: actor.id, discordId: dto.discordId });
    await this.discordActorRepository.create(discordActor);

    return discordActor;
  }
}
