import { Service } from '~/shared/core/Service';
import { JWTToken, Session, User, UserName } from '../../domain';
import { JWTFacade } from '../../facades/JWT';
import { UserRepository } from '../../repos';
import { SessionRepository } from '../../repos/Session';
import { createUserVerificationService } from '../CreateUserVerification';
import { InvalidCredentialsError } from './Errors';

interface LoginDTO {
  username: string;
  password: string;
  userAgent: string;
}

type LoginResult = {
  token: JWTToken;
  verificationCode: string | null;
  sessionId: string;
  user: User;
};

export class LoginService implements Service<LoginDTO, LoginResult> {
  constructor(private readonly userRepository: UserRepository, private readonly sessionRepository: SessionRepository) {}

  public async execute(dto: LoginDTO): Promise<LoginResult> {
    const username = UserName.create({ name: dto.username });
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await user.password.comparePassword(dto.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const session = Session.create({
      user,
      userAgent: dto.userAgent
    });
    const persistedSession = await this.sessionRepository.create(session);

    const token = JWTFacade.sign({
      userId: user.getId().toValue(),
      sessionId: persistedSession.getId().toValue()
    });

    let verificationCode = null;
    if (!user.isVerified) {
      const userVerificationResult = await createUserVerificationService.execute({ user });
      verificationCode = userVerificationResult.verificationCode;
    }

    return {
      token,
      verificationCode,
      user,
      sessionId: persistedSession.getId().toValue()
    };
  }
}
