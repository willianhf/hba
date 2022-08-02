import { Identifier } from './Identifier';
import { UniqueIdentifier } from './UniqueIdentifier';

export abstract class Entity<Props, TIdentifier extends Identifier<any> = UniqueIdentifier> {
  constructor(protected readonly props: Props, protected readonly _id: TIdentifier) {}

  get id() {
    return this._id;
  }

  public equals(object?: Entity<Props, TIdentifier>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
