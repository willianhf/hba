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

    const habboUser = await dto.user.getHabboProfile();
    if (!habboUser.motto.toLowerCase().includes(verification.verificationCode.code.toLowerCase())) {
      throw new VerificationError('A missão não contém o código de verificação.');
    }

    await this.userRepository.verify(dto.user.getId());
  }
}
