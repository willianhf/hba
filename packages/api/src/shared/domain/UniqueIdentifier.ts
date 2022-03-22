import { Identifier } from './Identifier';

export class UniqueIdentifier extends Identifier<string> {
  constructor(id: string) {
    super(id);
  }
}
