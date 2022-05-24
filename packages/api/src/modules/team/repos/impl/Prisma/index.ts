import { prismaSeasonRepository } from '~/modules/season/repos';
import { PrismaNBATeamRepository } from './NBATeam';
import { PrismaTeamRepository } from './Team';
import { PrismaTeamRosterRepository } from './TeamRoster';

export const prismaNBATeamRepository = new PrismaNBATeamRepository();
export const prismaTeamRepository = new PrismaTeamRepository(prismaSeasonRepository);
export const prismaTeamRosterRepository = new PrismaTeamRosterRepository();
