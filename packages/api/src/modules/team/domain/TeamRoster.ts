import { TeamRosterRole } from './TeamRosterRole';
import { UserId } from '~/modules/users/domain';
import { AggregateRoot, ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';

interface TeamRosterProps {
  teamId: UniqueIdentifier;
  userId: UserId;
  role: TeamRosterRole;
}

export type TeamRosterIdentifier = ComposedIdentifier<{
  teamId: UniqueIdentifier;
  userId: UserId;
}>;

export class TeamRoster extends AggregateRoot<TeamRosterProps, TeamRosterIdentifier> {
  public constructor(props: TeamRosterProps, id?: TeamRosterIdentifier) {
    super(props, id ?? new ComposedIdentifier({ teamId: props.teamId, userId: props.userId }));
  }

  public get teamId(): UniqueIdentifier {
    return this.props.teamId;
  }

  public get userId(): UserId {
    return this.props.userId;
  }

  public get role(): TeamRosterRole {
    return this.props.role;
  }
}
