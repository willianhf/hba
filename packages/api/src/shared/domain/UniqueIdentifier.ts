import { v4 as uuidv4 } from 'uuid';
import { Identifier } from './Identifier';

export class UniqueIdentifier extends Identifier<string> {
  constructor(id?: string) {
    super(id ?? uuidv4());
  }
}
