import { ValidationInputError } from '~/shared/core/Error';

export class NameTakenError extends ValidationInputError {
  constructor(name: string) {
    super({ field: 'username', message: `The season name "${name}" is already taken` });
  }
}

