import { prismaMatchResultRepository } from '~/modules/match/repos/impl/Prisma';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { GenerateStandingsUseCase } from './GenerateStandings';

export const generateStandingsUseCase = new GenerateStandingsUseCase(prismaTeamRepository, prismaMatchResultRepository);
