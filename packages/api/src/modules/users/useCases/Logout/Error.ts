import { ApplicationError } from '~/shared/core/Error';

export class LogoutSessionError extends ApplicationError {
  constructor() {
    super('LOGOUT_ERROR', 'Logout session error', 'Essa sessão não pertence ao usuário logado.');
  }
}
