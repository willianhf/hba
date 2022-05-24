import { ApprovalStatus } from '@prisma/client';
import { TeamRoster, TeamRosterIdentifier } from '~/modules/team/domain';
import { TeamRosterMapper } from '~/modules/team/mapper';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { TeamRosterRepository } from '../..';

export class PrismaTeamRosterRepository implements TeamRosterRepository {
  public async findById(id: TeamRosterIdentifier): Promise<TeamRoster | null> {
    const prismaTeamRoster = await prisma.teamRoster.findUnique({
      where: {
        teamId_playerId: id.compose()
      }
    });

    if (!prismaTeamRoster) {
      return null;
    }

    return TeamRosterMapper.toDomain(prismaTeamRoster);
  }

  public async create(teamRoster: TeamRoster): Promise<TeamRoster> {
    const data = TeamRosterMapper.toPersist(teamRoster);
    const prismaTeamRoster = await prisma.teamRoster.create({ data });

    return TeamRosterMapper.toDomain(prismaTeamRoster);
  }

  public async findByTeamId(teamId: UniqueIdentifier): Promise<TeamRoster[]> {
    const prismaTeamRosters = await prisma.teamRoster.findMany({
      where: {
        teamId: teamId.toValue()
      }
    });

    return prismaTeamRosters.map(TeamRosterMapper.toDomain);
  }

  public async isPlayerInRoster(playerId: UniqueIdentifier, seasonId: IncIdentifier): Promise<boolean> {
    const playersInRosterCount = await prisma.teamRoster.count({
      where: {
        playerId: playerId.toValue(),
        team: {
          seasonId: seasonId.toValue(),
          approvalStatus: ApprovalStatus.ACCEPTED
        }
      }
    });

    return playersInRosterCount > 0;
  }
}
