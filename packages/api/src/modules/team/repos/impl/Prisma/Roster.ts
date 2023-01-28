import { ActorId } from '~/modules/auth/domain';
import { SeasonId } from '~/modules/season/domain';
import { ApprovalStatus, TeamRole } from '~/modules/team/domain';
import { Roster } from '~/modules/team/domain/Roster';
import { TeamActorMapper } from '~/modules/team/mapper';
import { prisma } from '~/shared/infra/database';
import { RosterRepository } from '../../Roster';

export class PrismaRosterRepository implements RosterRepository {
  public async create(roster: Roster): Promise<void> {
    const data = roster.getItems().map(TeamActorMapper.toPersist);

    await prisma.teamActor.createMany({ data });
  }

  public async save(roster: Roster): Promise<void> {
    if (roster.getNewItems().length > 0) {
      const data = roster.getNewItems().map(TeamActorMapper.toPersist);

      await prisma.teamActor.createMany({ data });
    }

    if (roster.getRemovedItems().length > 0) {
      const removedIds = roster
        .getRemovedItems()
        .map(teamActor => ({ teamId: teamActor.teamId.toValue(), actorId: teamActor.actor.id.toValue() }));

      await prisma.teamActor.deleteMany({
        where: {
          actorId: {
            in: removedIds.map(removedId => removedId.actorId)
          },
          teamId: {
            in: removedIds.map(removedId => removedId.teamId)
          }
        }
      });
    }
  }

  public async isActorInRoster(actorId: ActorId, seasonId: SeasonId): Promise<boolean> {
    const playersInRosterCount = await prisma.teamActor.count({
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

  public async hasPendingApplication(actorId: ActorId, seasonId: SeasonId): Promise<boolean> {
    const applications = await prisma.teamActor.count({
      where: {
        actorId: actorId.toValue(),
        role: TeamRole.CAPTAIN,
        team: {
          seasonId: seasonId.toValue(),
          approvalStatus: ApprovalStatus.IDLE
        }
      }
    });

    return applications > 1;
  }
}
