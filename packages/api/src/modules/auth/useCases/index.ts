import { prismaActorRepository, prismaDiscordActorRepository } from '../repos/impl/prisma';
import { CreateDiscordActorUseCase } from './CreateDiscordActor';

export const createDiscordActor = new CreateDiscordActorUseCase(prismaActorRepository, prismaDiscordActorRepository);
