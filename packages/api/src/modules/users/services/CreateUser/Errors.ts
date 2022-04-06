import { ValidationInputError } from '~/shared/core/Error';

export class UsernameTakenError extends ValidationInputError {
  constructor(username: string) {
    super({ field: 'username', message: `O usuário "${username}" já existe.` });
  }
}
