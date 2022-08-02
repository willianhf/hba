import { IUseCase } from '~/shared/core';
import { EntityNotFoundError } from '~/shared/core/Error';
import { UniqueIdentifier } from '~/shared/domain';
import { User } from '../../domain';
import { SessionRepository } from '../../repos/Session';
import * as Errors from './Error';

interface LogoutDTO {
  sessionId: string;
  user: User;
}

type LogoutResult = void;

export class LogoutUseCase implements IUseCase<LogoutDTO, LogoutResult> {
  constructor(private readonly sessionRepository: SessionRepository) {}

  public async execute(dto: LogoutDTO): Promise<LogoutResult> {
    const session = await this.sessionRepository.getById(new UniqueIdentifier(dto.sessionId));
    if (!session) {
      throw new EntityNotFoundError('This session does not exist.');
    }

    if (!dto.user.id.equals(session.user.id)) {
      throw new Errors.LogoutSessionError();
    }

    await this.sessionRepository.delete(session);
  }
}
