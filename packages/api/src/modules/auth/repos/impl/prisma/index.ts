import { PrismaActorRepository } from './Actor';
import { PrismaDiscordActorRepository } from './DiscordActor';
import { PrismaIdentityRepository } from './Identity';

export const prismaActorRepository = new PrismaActorRepository();
export const prismaDiscordActorRepository = new PrismaDiscordActorRepository();
export const prismaIdentityRepository = new PrismaIdentityRepository();
