import { Service } from '~/shared/core/Service';
import { User, UserName, UserPassword } from '../../domain';
import { UserRepository } from '../../repos';
import { UsernameTakenError } from './Errors';

interface CreateUserDTO {
  username: string;
  password: string;
}

export class CreateUserService implements Service<CreateUserDTO, User> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    const username = UserName.create({ name: dto.username });
    const password = UserPassword.create({ value: dto.password });

    const isUsernameTaken = await this.userRepository.exists(username);
    if (isUsernameTaken) {
      throw new UsernameTakenError(username.value);
    }

    const user = User.create({ username, password }).getValue();
    const persistedUser = await this.userRepository.save(user);

    return persistedUser;
  }
}
