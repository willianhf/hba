import { ApprovalStatus } from '@prisma/client';
import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';

interface TeamProps {
  nbaTeamId: UniqueIdentifier;
  seasonId: IncIdentifier;
  status?: ApprovalStatus;
}

export class Team extends PersistableEntity<TeamProps, UniqueIdentifier> {
  public constructor(props: TeamProps, id?: UniqueIdentifier) {
    super(props, id);
  }

  public get nbaTeamId(): UniqueIdentifier {
    return this.props.nbaTeamId;
  }

  public get seasonId(): IncIdentifier {
    return this.props.seasonId;
  }

  public get status(): ApprovalStatus {
    return this.props.status ?? ApprovalStatus.IDLE;
  }
}
