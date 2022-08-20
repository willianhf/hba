import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';

interface PlayerIconProps {
  playerId: string;
  iconId: string;
}

export class PlayerIcon extends AggregateRoot<PlayerIconProps, UniqueIdentifier> {
  public constructor(props: PlayerIconProps, id?: UniqueIdentifier) {
    super(props, id ?? new UniqueIdentifier());
  }
}
