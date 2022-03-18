import { Result } from '~/shared/core';
import { Service } from '~/shared/core/Service';
import { User, UserName, UserPassword } from '../../domain';
import { UserRepository } from '../../repos';
import { UsernameTakenError, ValidationError } from './Errors';

interface CreateUserDTO {
  username: string;
  password: string;
}

export class CreateUserService implements Service<CreateUserDTO, User> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDTO): Promise<User> {
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

    const user = User.create({ username, password: passwordResult.getValue() }).getValue();
    const persistedUser = await this.userRepository.save(user);

    return persistedUser;
  }
}
