import { TeamRosterRole } from './TeamRosterRole';
import { ActorId } from '~/modules/auth/domain';
import { AggregateRoot, ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';

interface TeamRosterProps {
  teamId: UniqueIdentifier;
  actorId: ActorId;
  role: TeamRosterRole;
}

export type TeamRosterIdentifier = ComposedIdentifier<{
  teamId: UniqueIdentifier;
  actorId: ActorId;
}>;

export class TeamRoster extends AggregateRoot<TeamRosterProps, TeamRosterIdentifier> {
  public constructor(props: TeamRosterProps, id?: TeamRosterIdentifier) {
    super(props, id ?? new ComposedIdentifier({ teamId: props.teamId, actorId: props.actorId }));
  }

  public get teamId(): UniqueIdentifier {
    return this.props.teamId;
  }

  public get actorId(): ActorId {
    return this.props.actorId;
  }

  public get role(): TeamRosterRole {
    return this.props.role;
  }
}
