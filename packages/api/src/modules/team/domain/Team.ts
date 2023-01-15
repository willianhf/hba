import { Season } from '~/modules/season/domain';
import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';
import { ApprovalStatus } from './ApprovalStatus';
import { NBATeam } from './NBATeam';
import { Roster } from './Roster';
import { TeamActor } from './TeamActor';

export class TeamId extends UniqueIdentifier {}

interface TeamProps {
  nbaTeam: NBATeam;
  season: Season;
  status: ApprovalStatus;
  roster?: Roster;
}

export class Team extends AggregateRoot<TeamProps> {
  constructor(props: TeamProps, id?: TeamId) {
    super(
      {
        ...props,
        roster: props.roster ?? new Roster()
      },
      id ?? new TeamId()
    );
  }

  public get nbaTeam(): NBATeam {
    return this.props.nbaTeam;
  }

  public get season(): Season {
    return this.props.season;
  }

  public get status(): ApprovalStatus {
    return this.props.status;
  }

  public get roster(): Roster {
    return this.props.roster!;
  }

  public addToRoster(teamActor: TeamActor): void {
    this.roster.add(teamActor);
  }

  public removeFromRoster(teamActor: TeamActor): void {
    this.roster.remove(teamActor);
  }

  public changeStatus(status: ApprovalStatus): void {
    this.props.status = status;
  }
}
