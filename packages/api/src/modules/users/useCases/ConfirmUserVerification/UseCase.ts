import { IUseCase } from '~/shared/core';
import { EntityNotFoundError } from '~/shared/core/Error';
import { User } from '../../domain';
import { UserRepository, VerificationRepository } from '../../repos';
import { VerificationError } from './Errors';

interface ConfirmUserVerificationDTO {
  user: User;
}

type ConfirmUserVerificationResult = void;

export class ConfirmUserVerificationUseCase
  implements IUseCase<ConfirmUserVerificationDTO, ConfirmUserVerificationResult>
{
  public constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async execute(dto: ConfirmUserVerificationDTO): Promise<ConfirmUserVerificationResult> {
    const verification = await this.verificationRepository.findByUser(dto.user);
    if (!verification) {
      throw new EntityNotFoundError('The user does not have a verification');
    }

    const habboProfile = await dto.user.habboProfile;
    if (!habboProfile?.motto.toLowerCase().includes(verification.code.value.toLowerCase())) {
      throw new VerificationError('A missão não contém o código de verificação válido.');
    }

    await this.userRepository.verify(dto.user.id);
  }
}
