import { ApplicationError } from '~/shared/core/Error';

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super('INVALID_CREDENTIALS_ERROR', 'Invalid credentials', 'Nome de usuário ou senha inválidos.');
  }
}