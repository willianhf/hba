import { ApprovalStatus } from '@prisma/client';
import { AggregateRoot, IncIdentifier, UniqueIdentifier } from '~/shared/domain';

interface TeamProps {
  nbaTeamId: UniqueIdentifier;
  seasonId: IncIdentifier;
  status?: ApprovalStatus;
}

export class Team extends AggregateRoot<TeamProps> {
  public constructor(props: TeamProps, id?: UniqueIdentifier) {
    super(props, id ?? new UniqueIdentifier());
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
