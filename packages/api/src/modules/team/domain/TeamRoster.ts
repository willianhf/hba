import { TeamRosterRole } from '@prisma/client';
import { AggregateRoot, ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';

interface TeamRosterProps {
  teamId: UniqueIdentifier;
  playerId: UniqueIdentifier;
  role: TeamRosterRole;
}

export type TeamRosterIdentifier = ComposedIdentifier<{
  teamId: UniqueIdentifier;
  playerId: UniqueIdentifier;
}>;

export class TeamRoster extends AggregateRoot<TeamRosterProps, TeamRosterIdentifier> {
  public constructor(props: TeamRosterProps, id?: TeamRosterIdentifier) {
    super(props, id ?? new ComposedIdentifier({ teamId: props.teamId, playerId: props.playerId }));
  }

  public get teamId(): UniqueIdentifier {
    return this.props.teamId;
  }

  public get playerId(): UniqueIdentifier {
    return this.props.playerId;
  }

  public get role(): TeamRosterRole {
    return this.props.role;
  }
}
