import { EntityNotFoundError, ValidationInputError } from '~/shared/core/Error';
import { Service } from '~/shared/core/Service';
import { JWTToken, User, UserName, UserPassword } from '../../domain';
import { UserRepository } from '../../repos';
import { createUserVerificationService } from '../CreateUserVerification';
import { loginService } from '../Login';
import { UsernameTakenError } from './Errors';

interface CreateUserDTO {
  username: string;
  password: string;
  userAgent: string;
}

interface CreateUserResult {
  verificationCode: string;
  jwtToken: JWTToken;
  user: User;
  sessionId: string;
}

export class CreateUserService implements Service<CreateUserDTO, CreateUserResult> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDTO): Promise<CreateUserResult> {
    const username = UserName.create({ name: dto.username });
    const password = UserPassword.create({ value: dto.password });

    const isUsernameTaken = await this.userRepository.exists(username);
    if (isUsernameTaken) {
      throw new UsernameTakenError(username.value);
    }

    const user = User.create({ username, password });
    try {
      await user.getHabboProfile();
    } catch (ex) {
      if (ex instanceof EntityNotFoundError) {
        throw new ValidationInputError({
          field: 'username',
          message: `O usuário "${dto.username}" não existe no Habbo.`
        });
      }

      throw ex;
    }

    const persistedUser = await this.userRepository.save(user);

    const loginResult = await loginService.execute({
      username: dto.username,
      password: dto.password,
      userAgent: dto.userAgent
    });

    const userVerificationResult = await createUserVerificationService.execute({ user: persistedUser });

    return {
      jwtToken: loginResult.token,
      verificationCode: userVerificationResult.verificationCode,
      user: persistedUser,
      sessionId: loginResult.sessionId
    };
  }
}
