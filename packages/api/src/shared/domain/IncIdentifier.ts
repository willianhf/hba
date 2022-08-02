import { Identifier } from './Identifier';

export class IncIdentifier extends Identifier<number> {
  private static currentId: number = -1;

  constructor(id?: number) {
    super(id ?? IncIdentifier.currentId--);
  }
}
