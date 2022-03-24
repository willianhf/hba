import { UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';

interface PlayerIconProps {
  playerId: string;
  iconId: string;
}

export class PlayerIcon extends PersistableEntity<PlayerIconProps, UniqueIdentifier> {
  public constructor(props: PlayerIconProps, id?: UniqueIdentifier) {
    super(props, id);
  }
}
