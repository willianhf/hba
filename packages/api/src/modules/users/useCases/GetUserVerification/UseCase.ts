import { IUseCase } from '~/shared/core';
import { User } from '../../domain';
import { Verification } from '../../domain/Verification';
import { CreateUserVerificationUseCase } from '../CreateUserVerification/UseCase';
import { FetchUserVerificationUseCase } from '../FetchUserVerification/UseCase';

interface GetUserVerificationDTO {
  user: User;
}

type GetUserVerificationResult = Verification;

export class GetUserVerificationUseCase implements IUseCase<GetUserVerificationDTO, GetUserVerificationResult> {
  public constructor(
    private readonly fetchUserVerificationUseCase: FetchUserVerificationUseCase,
    private readonly createUserVerificationUseCase: CreateUserVerificationUseCase
  ) {}

  public async execute(dto: GetUserVerificationDTO): Promise<GetUserVerificationResult> {
    const verification = await this.fetchUserVerificationUseCase.execute({ user: dto.user });
    if (!verification) {
      return this.createUserVerificationUseCase.execute({ user: dto.user });
    }

    return verification;
  }
}
