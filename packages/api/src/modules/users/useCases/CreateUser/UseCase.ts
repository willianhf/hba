import { IUseCase, ValidationInputError } from '~/shared/core';
import { JWTToken, Session, User, UserName, UserPassword, Verification } from '../../domain';
import { UserRepository } from '../../repos';
import { loginUseCase } from '../Login';

interface CreateUserDTO {
  username: string;
  password: string;
  userAgent: string;
}

interface CreateUserResult {
  verification: Verification;
  token: JWTToken;
  session: Session;
  user: User;
}

export class CreateUserUseCase implements IUseCase<CreateUserDTO, CreateUserResult> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDTO): Promise<CreateUserResult> {
    const username = UserName.create({ value: dto.username });
    const password = UserPassword.create({ value: dto.password });

    const isUsernameTaken = await this.userRepository.exists(username);
    if (isUsernameTaken) {
      throw new ValidationInputError({ field: 'username', message: `O usuário "${username.value}" já existe.` });
    }

    const user = await User.register({ username, password });
    await this.userRepository.save(user);

    const loginResult = await loginUseCase.execute({
      username: dto.username,
      password: dto.password,
      userAgent: dto.userAgent
    });

    const verification = loginResult.verification!;

    return {
      ...loginResult,
      verification,
      user
    };
  }
}
