import { ApplicationError } from '~/shared/core/Error';

export class VerificationError extends ApplicationError {
  public constructor(message: string) {
    super('USER_VERIFICATION_ERROR', 'User verification error', message);
  }
}