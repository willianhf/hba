import { Actor } from '~/modules/auth/domain';
import { WatchedList } from '~/shared/domain';
import { TeamActor } from './TeamActor';
import { TeamRole } from './TeamRole';

export class Roster extends WatchedList<TeamActor> {
  public constructor(roster?: TeamActor[]) {
    super(roster ?? []);
  }

  public compareItems(a: TeamActor, b: TeamActor): boolean {
    return a.equals(b);
  }

  public get captain(): Actor {
    const captain = this.getItems().find(teamActor => teamActor.role === TeamRole.CAPTAIN);
    if (!captain) {
      throw new Error(`You're trying to access a captain from a invalid team`);
    }

    return captain.actor;
  }

  public get coCaptain(): Actor {
    const coCaptain = this.getItems().find(teamActor => teamActor.role === TeamRole.CO_CAPTAIN);
    if (!coCaptain) {
      throw new Error(`You're trying to access a co-captain from a invalid team`);
    }

    return coCaptain.actor;
  }

  public get players(): TeamActor[] {
    return this.getItems().filter(teamActor => teamActor.role === TeamRole.PLAYER);
  }
}
