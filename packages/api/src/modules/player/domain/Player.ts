import { IncIdentifier, UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';
import { RequiredExceptFor } from '~/types/common';
import { ApprovalStatus } from './ApprovalStatus';

interface PlayerProps {
  userId: UniqueIdentifier;
  seasonId: IncIdentifier;
  nbaPlayerId: UniqueIdentifier;
  positionId: UniqueIdentifier;
  approvalStatus: ApprovalStatus;
  iconIds: UniqueIdentifier[];
}

type CreatePlayerProps = RequiredExceptFor<PlayerProps, 'approvalStatus'>;

export class Player extends PersistableEntity<PlayerProps, UniqueIdentifier> {
  private constructor(props: PlayerProps, id?: UniqueIdentifier) {
    super(props, id);
  }

  public static create(props: CreatePlayerProps, id?: UniqueIdentifier): Player {
    return new Player({ ...props, approvalStatus: props.approvalStatus ?? ApprovalStatus.IDLE }, id);
  }

  public get userId(): UniqueIdentifier {
    return this.props.userId;
  }

  public get seasonId(): IncIdentifier {
    return this.props.seasonId
  }

  public get nbaPlayerId(): UniqueIdentifier {
    return this.props.nbaPlayerId;
  }

  public get positionId(): UniqueIdentifier {
    return this.props.positionId;
  }

  public get iconIds(): UniqueIdentifier[] {
    return this.props.iconIds;
  }
}
