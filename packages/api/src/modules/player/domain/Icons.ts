import { WatchedList } from '~/shared/domain';
import { Icon, IconCategory } from './Icon';
import { PlayerIcon } from './PlayerIcon';

export class Icons extends WatchedList<PlayerIcon> {
  public constructor(icons?: PlayerIcon[]) {
    super(icons ?? []);
  }

  public compareItems(a: PlayerIcon, b: PlayerIcon): boolean {
    return a.equals(b);
  }

  public get primaryIcon(): Icon {
    const playerIcon = this.getItems().find(playerIcon => playerIcon.icon.category === IconCategory.PRIMARY);
    if (!playerIcon) {
      throw new Error(`You're trying to access a icon from a invalid player`);
    }

    return playerIcon.icon;
  }

  public get secondaryIcon(): Icon {
    const playerIcon = this.getItems().find(playerIcon => playerIcon.icon.category === IconCategory.SECONDARY);
    if (!playerIcon) {
      throw new Error(`You're trying to access a icon from a invalid player`);
    }

    return playerIcon.icon;
  }
}
