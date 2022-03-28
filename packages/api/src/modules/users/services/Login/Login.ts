import { ApplicationError } from '~/shared/core/Error';
import { Service } from '~/shared/core/Service';
import { JWTToken, Session, UserName } from '../../domain';
import { JWTFacade } from '../../facades/JWT';
import { UserRepository } from '../../repos';
import { SessionRepository } from '../../repos/Session';
import { ActiveSessionError, InvalidCredentialsError } from './Errors';

interface LoginDTO {
  username: string;
  password: string;
  userAgent: string;
}

type Output = JWTToken;

export class LoginService implements Service<LoginDTO, Output> {
  constructor(private readonly userRepository: UserRepository, private readonly sessionRepository: SessionRepository) {}

  public async execute(dto: LoginDTO): Promise<Output> {
    const username = UserName.create({ name: dto.username });
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await user.password.comparePassword(dto.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const userSessions = await this.sessionRepository.getByUserId(user.getId());
    const hasActiveSession = userSessions.some(session => session.userAgent === dto.userAgent);
    if (hasActiveSession) {
      throw new ActiveSessionError();
    }

    const session = Session.create({
      user,
      userAgent: dto.userAgent
    });
    const persistedSession = await this.sessionRepository.create(session);

    const jwtToken = JWTFacade.sign({
      userId: user.getId().toValue(),
      sessionId: persistedSession.getId().toValue()
    });

    return jwtToken;
  }
}
