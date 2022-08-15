import { IUseCase } from '~/shared/core';
import { User, UserName } from '../../domain';
import { UserRepository } from '../../repos';

interface FetchUserDTO {
  username: string;
}

type FetchUserResponse = User | null;

export class FetchUserUseCase implements IUseCase<FetchUserDTO, FetchUserResponse> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(dto: FetchUserDTO): Promise<FetchUserResponse> {
    const username = UserName.create({ value: dto.username });
    const user = await this.userRepository.getUserByUsername(username);

    return user;
  }
}
