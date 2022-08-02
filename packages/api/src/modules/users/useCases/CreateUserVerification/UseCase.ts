import { IUseCase } from '~/shared/core';
import { User } from '../../domain';
import { Verification, VerificationCode } from '../../domain/Verification';
import { VerificationRepository } from '../../repos';

interface CreateUserVerificationDTO {
  user: User;
}

type CreateUserVerificationResult = Verification;

export class CreateUserVerificationUseCase
  implements IUseCase<CreateUserVerificationDTO, CreateUserVerificationResult>
{
  public constructor(private readonly verificationRepository: VerificationRepository) {}

  public async execute(dto: CreateUserVerificationDTO): Promise<CreateUserVerificationResult> {
    const verificationCode = VerificationCode.create();
    const verification = Verification.create({ code: verificationCode, user: dto.user });
    await this.verificationRepository.create(verification);

    return verification;
  }
}
