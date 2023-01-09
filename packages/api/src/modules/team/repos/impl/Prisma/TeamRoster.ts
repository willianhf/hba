import { ApprovalStatus, TeamRosterRole } from '@prisma/client';
import { TeamRoster, TeamRosterIdentifier } from '~/modules/team/domain';
import { TeamRosterMapper } from '~/modules/team/mapper';
import { ActorId } from '~/modules/auth/domain';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { TeamRosterRepository } from '../..';

export class PrismaTeamRosterRepository implements TeamRosterRepository {
  public async findById(id: TeamRosterIdentifier): Promise<TeamRoster | null> {
    const prismaTeamRoster = await prisma.teamRoster.findUnique({
      where: {
        teamId_actorId: id.compose()
      }
    });

    if (!prismaTeamRoster) {
      return null;
    }

    return TeamRosterMapper.toDomain(prismaTeamRoster);
  }

  public async create(teamRoster: TeamRoster): Promise<void> {
    const data = TeamRosterMapper.toPersist(teamRoster);
    await prisma.teamRoster.create({ data });
  }

  public async findByTeamId(teamId: UniqueIdentifier): Promise<TeamRoster[]> {
    const prismaTeamRosters = await prisma.teamRoster.findMany({
      where: {
        teamId: teamId.toValue()
      },
      orderBy: {
        role: 'asc'
      }
    });

    return prismaTeamRosters.map(TeamRosterMapper.toDomain);
  }

  public async findByRoles(teamId: UniqueIdentifier, roles: TeamRosterRole[]): Promise<TeamRoster[]> {
    const prismaTeamRosters = await prisma.teamRoster.findMany({
      where: {
        teamId: teamId.toValue(),
        role: {
          in: roles
        }
      },
      orderBy: {
        role: 'asc'
      }
    });

    return prismaTeamRosters.map(TeamRosterMapper.toDomain);
  }

  public async isActorInRoster(actorId: ActorId, seasonId: IncIdentifier): Promise<boolean> {
    const playersInRosterCount = await prisma.teamRoster.count({
      where: {
        actorId: actorId.toValue(),
        team: {
          seasonId: seasonId.toValue(),
          approvalStatus: ApprovalStatus.ACCEPTED
        }
      }
    });

    return playersInRosterCount > 0;
  }

  public async hasPendingApplication(actorId: ActorId, seasonId: IncIdentifier): Promise<boolean> {
    const applications = await prisma.teamRoster.count({
      where: {
        actorId: actorId.toValue(),
        role: TeamRosterRole.CAPTAIN,
        team: {
          seasonId: seasonId.toValue(),
          approvalStatus: ApprovalStatus.IDLE
        }
      }
    });

    return applications > 0;
  }
}
