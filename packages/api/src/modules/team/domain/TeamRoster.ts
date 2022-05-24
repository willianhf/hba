import { TeamRosterRole } from '@prisma/client';
import { ComposedIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';

interface TeamRosterProps {
  teamId: UniqueIdentifier;
  playerId: UniqueIdentifier;
  role: TeamRosterRole;
}

export type TeamRosterIdentifier = ComposedIdentifier<{
  teamId: UniqueIdentifier;
  playerId: UniqueIdentifier;
}>;

export class TeamRoster extends PersistableEntity<TeamRosterProps, TeamRosterIdentifier> {
  public constructor(props: TeamRosterProps, id?: TeamRosterIdentifier) {
    super(props, id);
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
