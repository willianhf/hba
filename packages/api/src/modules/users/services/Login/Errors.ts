import { ApplicationError } from '~/shared/core/Error';

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super('InvalidCredentialsError', 'Invalid credentials', 'The provided credentials are invalid');
  }
}