import { EntityNotFoundError } from '~/shared/core/Error';
import { Service } from '~/shared/core/Service';
import { User } from '../../domain';
import { UserRepository, VerificationRepository } from '../../repos';
import { VerificationError } from './Errors';

interface ConfirmUserVerificationDTO {
  user: User;
}

type ConfirmUserVerificationResult = void;

export class ConfirmUserVerificationService
  implements Service<ConfirmUserVerificationDTO, ConfirmUserVerificationResult>
{
  public constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async execute(dto: ConfirmUserVerificationDTO): Promise<ConfirmUserVerificationResult> {
    const verification = await this.verificationRepository.findByUser(dto.user);
    if (!verification) {
      throw new EntityNotFoundError();
    }

    if (verification.verificationCode.isExpired()) {
      throw new VerificationError('Verification code is expired.');
    }

    const habboUser = await dto.user.getHabboProfile();
    if (habboUser.motto !== verification.verificationCode.code) {
      throw new VerificationError('Habbo user with invalid verification code at the motto.');
    }

    await this.userRepository.verify(dto.user.getId());
  }
}
