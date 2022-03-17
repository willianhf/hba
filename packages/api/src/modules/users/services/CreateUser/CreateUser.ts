import { Result } from '~/shared/core';
import { Service } from '~/shared/core/Service';
import { User, UserName, UserPassword } from '../../domain';
import { UserRepository } from '../../repos';
import { UsernameTakenError, ValidationError } from './Errors';

interface CreateUserDTO {
  username: string;
  password: string;
}

type Output = Result<User>;

export class CreateUserService implements Service<CreateUserDTO, Output> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDTO): Promise<Output> {
    const usernameResult = UserName.create({ name: dto.username });
    const passwordResult = UserPassword.create({ value: dto.password });
    const validationResult = Result.combine([usernameResult, passwordResult]);
    if (validationResult.isFailure()) {
      throw new ValidationError(validationResult.errorString());
    }

    const username = usernameResult.getValue();
    const isUsernameTaken = await this.userRepository.exists(username);
    if (isUsernameTaken) {
      throw new UsernameTakenError(username.value);
    }

    const userResult = User.create({
      username,
      password: passwordResult.getValue(),
    });
    if (userResult.isFailure()) {
      throw new ValidationError(userResult.error.toString());
    }

    const user = userResult.getValue();
    const persistedUser = await this.userRepository.save(user);

    return Result.ok(persistedUser);
  }
}
