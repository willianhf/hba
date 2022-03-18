import { ApplicationError } from '~/shared/core/Error';

export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super('ValidationError', 'Validation Error', message);
  }
}

export class UsernameTakenError extends ApplicationError {
  constructor(username: string) {
    super('UsernameTakenError', 'Username is already taken', `The username "${username}" is already taken`);
  }
}
