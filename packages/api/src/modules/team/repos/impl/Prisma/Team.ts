import { ApprovalStatus } from '@prisma/client';
import { SeasonRepository } from '~/modules/season/repos';
import { Team } from '~/modules/team/domain';
import { TeamMapper } from '~/modules/team/mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { TeamRepository } from '../..';

export class PrismaTeamRepository implements TeamRepository {
  public constructor(private seasonRepository: SeasonRepository) {}

  public async findAll(): Promise<Team[]> {
    const prismaTeams = await prisma.team.findMany();

    return prismaTeams.map(TeamMapper.toDomain);
  }

  public async findById(id: UniqueIdentifier): Promise<Team> {
    const prismaTeam = await prisma.team.findUnique({
      where: {
        id: id.toValue()
      },
      rejectOnNotFound: true
    });

    return TeamMapper.toDomain(prismaTeam);
  }

  public async create(team: Team): Promise<Team> {
    const data = TeamMapper.toPersist(team);
    const prismaTeam = await prisma.team.create({ data });

    return TeamMapper.toDomain(prismaTeam);
  }

  public async isAvailable(nbaTeamId: UniqueIdentifier): Promise<boolean> {
    const currentSeason = await this.seasonRepository.findCurrent();

    const prismaTeam = await prisma.team.findFirst({
      where: {
        nbaTeamId: nbaTeamId.toValue(),
        seasonId: currentSeason.id.toValue(),
        approvalStatus: ApprovalStatus.ACCEPTED
      }
    });

    return !prismaTeam;
  }
}
