import { ApprovalStatus } from '@prisma/client';
import { AggregateRoot, IncIdentifier, UniqueIdentifier } from '~/shared/domain';

export class TeamId extends UniqueIdentifier {}

interface TeamProps {
  nbaTeamId: UniqueIdentifier;
  seasonId: IncIdentifier;
  status?: ApprovalStatus;
}

export class Team extends AggregateRoot<TeamProps> {
  public constructor(props: TeamProps, id?: TeamId) {
    super(props, id ?? new TeamId());
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
