import { ValidationInputError } from '~/shared/core/Error';

export class UsernameTakenError extends ValidationInputError {
  constructor(username: string) {
    super({ field: 'username', message: `The username "${username}" is already taken` });
  }
}
