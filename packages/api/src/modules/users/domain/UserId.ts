import { UniqueIdentifier } from '~/shared/domain';

export class UserId extends UniqueIdentifier {
  public constructor(id?: string) {
    super(id);
  }
}
