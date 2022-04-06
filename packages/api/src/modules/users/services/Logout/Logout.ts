import { EntityNotFoundError } from '~/shared/core/Error';
import { Service } from '~/shared/core/Service';
import { UniqueIdentifier } from '~/shared/domain';
import { User } from '../../domain';
import { SessionRepository } from '../../repos/Session';
import { LogoutSessionError } from './Error';

interface LogoutDTO {
  sessionId: string;
  user: User;
}

type LogoutResult = void;

export class LogoutService implements Service<LogoutDTO, LogoutResult> {
  constructor(private readonly sessionRepository: SessionRepository) {}

  public async execute(dto: LogoutDTO): Promise<LogoutResult> {
    const session = await this.sessionRepository.getById(new UniqueIdentifier(dto.sessionId));
    if (!session) {
      throw new EntityNotFoundError();
    }

    if (!dto.user.getId().equals(session.user.getId())) {
      throw new LogoutSessionError();
    }

    await this.sessionRepository.delete(session);
  }
}
