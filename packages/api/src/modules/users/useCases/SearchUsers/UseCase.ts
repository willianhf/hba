import { IUseCase } from '~/shared/core';
import { User } from '../../domain';
import { UserRepository } from '../../repos';

interface SearchUsersDTO {
  search: string;
}

interface SearchUsersResponse {
  users: User[];
}

export class SearchUsersUseCase implements IUseCase<SearchUsersDTO, SearchUsersResponse> {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute(dto: SearchUsersDTO): Promise<SearchUsersResponse> {
    const [users] = await Promise.all([
      this.userRepository.search(dto.search),
      new Promise(resolve => setTimeout(resolve, 800))
    ]);

    return {
      users
    };
  }
}
