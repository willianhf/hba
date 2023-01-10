import { Actor, ActorId } from '~/modules/auth/domain';
import { AggregateRoot, ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';
import { TeamRole } from './TeamRole';

interface TeamActorProps {
  teamId: UniqueIdentifier;
  actor: Actor;
  role: TeamRole;
}

export type TeamActorIdentifier = ComposedIdentifier<{
  teamId: UniqueIdentifier;
  actorId: ActorId;
}>;

export class TeamActor extends AggregateRoot<TeamActorProps, TeamActorIdentifier> {
  public constructor(props: TeamActorProps, id?: TeamActorIdentifier) {
    super(props, id ?? new ComposedIdentifier({ teamId: props.teamId, actorId: props.actor.id }));
  }

  public get teamId(): UniqueIdentifier {
    return this.props.teamId;
  }

  public get actor(): Actor {
    return this.props.actor;
  }

  public get role(): TeamRole {
    return this.props.role;
  }
}
