import { ApplicationError } from '~/shared/core/Error';

export class CreateUserError extends ApplicationError {
  constructor(name: string, title: string, description: string) {
    super(name, title, description);
  }
}

export class ValidationError extends CreateUserError {
  constructor(message: string) {
    super('ValidationError', 'Validation Error', message);
  }
}

export class UsernameTakenError extends CreateUserError {
  constructor(username: string) {
    super(
      'UsernameTakenError',
      'Username is already taken',
      `The username "${username}" is already taken`
    );
  }
}
