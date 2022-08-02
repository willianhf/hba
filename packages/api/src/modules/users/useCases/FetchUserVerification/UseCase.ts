import { IUseCase } from '~/shared/core';
import { User } from '../../domain';
import { Verification } from '../../domain/Verification';
import { VerificationRepository } from '../../repos';

interface FetchUserVerificationDTO {
  user: User;
}

type FetchUserVerificationResult = Verification | null;

export class FetchUserVerificationUseCase implements IUseCase<FetchUserVerificationDTO, FetchUserVerificationResult> {
  public constructor(private readonly verificationRepository: VerificationRepository) {}

  public async execute(dto: FetchUserVerificationDTO): Promise<FetchUserVerificationResult> {
    return this.verificationRepository.findByUser(dto.user);
  }
}
