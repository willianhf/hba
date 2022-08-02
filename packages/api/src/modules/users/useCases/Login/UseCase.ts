import { IUseCase } from '~/shared/core';
import { JWTToken, Session, User, UserName } from '../../domain';
import { Verification } from '../../domain/Verification';
import { JWTFacade } from '../../facades/JWT';
import { UserRepository } from '../../repos';
import { SessionRepository } from '../../repos/Session';
import { GetUserVerificationUseCase } from '../GetUserVerification/UseCase';
import * as Errors from './Errors';

interface LoginDTO {
  username: string;
  password: string;
  userAgent: string;
}

type LoginResult = {
  token: JWTToken;
  session: Session;
  user: User;
  verification?: Verification;
};

export class LoginUseCase implements IUseCase<LoginDTO, LoginResult> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly getUserVerificationUseCase: GetUserVerificationUseCase
  ) {}

  public async execute(dto: LoginDTO): Promise<LoginResult> {
    const username = UserName.create({ value: dto.username });
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new Errors.InvalidCredentialsError();
    }

    const isPasswordValid = await user.password.comparePassword(dto.password);
    if (!isPasswordValid) {
      throw new Errors.InvalidCredentialsError();
    }

    const session = Session.create({
      user,
      userAgent: dto.userAgent
    });
    await this.sessionRepository.create(session);

    const token = JWTFacade.sign({
      userId: user.id.toValue(),
      sessionId: session.id.toValue()
    });

    if (!user.isVerified) {
      const verification = await this.getUserVerificationUseCase.execute({ user });
      return { verification, token, user, session };
    }

    return {
      token,
      user,
      session
    };
  }
}
