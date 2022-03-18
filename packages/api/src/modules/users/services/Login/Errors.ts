import { ApplicationError } from '~/shared/core/Error';

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super('INVALID_CREDENTIALS_ERROR', 'Invalid credentials', 'The provided credentials are invalid.');
  }
}

export class ActiveSessionError extends ApplicationError {
  constructor() {
    super('ACTIVE_SESSION_ERROR', 'Active session error', 'You already have an active session');
  }
}