import { prismaSeasonRepository } from '~/modules/season/repos';
import { PrismaNBATeamRepository } from './NBATeam';
import { PrismaTeamRepository } from './Team';
import { PrismaRosterRepository } from './Roster';

export const prismaNBATeamRepository = new PrismaNBATeamRepository();
export const prismaRosterRepository = new PrismaRosterRepository();
export const prismaTeamRepository = new PrismaTeamRepository(prismaSeasonRepository, prismaRosterRepository);
