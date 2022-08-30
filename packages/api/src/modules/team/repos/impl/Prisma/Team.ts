import { SeasonRepository } from '~/modules/season/repos';
import { Team, ApprovalStatus } from '~/modules/team/domain';
import { TeamMapper } from '~/modules/team/mapper';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { TeamRepository } from '../..';

export class PrismaTeamRepository implements TeamRepository {
  public constructor(private seasonRepository: SeasonRepository) {}

  public async findAll(): Promise<Team[]> {
    const prismaTeams = await prisma.team.findMany({});

    return prismaTeams.map(TeamMapper.toDomain);
  }

  public async findByStatus(seasonId: IncIdentifier, status: ApprovalStatus): Promise<Team[]> {
    const prismaTeams = await prisma.team.findMany({
      where: {
        seasonId: seasonId.toValue(),
        approvalStatus: status
      }
    });

    return prismaTeams.map(TeamMapper.toDomain);
  }

  public async findById(id: UniqueIdentifier): Promise<Team | null> {
    const prismaTeam = await prisma.team.findUnique({
      where: {
        id: id.toValue()
      }
    });

    if (!prismaTeam) {
      return null;
    }

    return TeamMapper.toDomain(prismaTeam);
  }

  public async create(team: Team): Promise<void> {
    const data = TeamMapper.toPersist(team);
    await prisma.team.create({ data });
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
