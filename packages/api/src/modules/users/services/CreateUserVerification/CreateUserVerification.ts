import { Service } from '~/shared/core/Service';
import { User } from '../../domain';
import { Verification, VerificationCode } from '../../domain/Verification';
import { VerificationRepository } from '../../repos';

interface CreateUserVerificationDTO {
  user: User;
}

interface CreateUserVerificationResult {
  verificationCode: string;
}

export class CreateUserVerificationService implements Service<CreateUserVerificationDTO, CreateUserVerificationResult> {
  public constructor(private readonly verificationRepository: VerificationRepository) {}

  public async execute(dto: CreateUserVerificationDTO): Promise<CreateUserVerificationResult> {
    const currentVerification = await this.verificationRepository.findByUser(dto.user);
    if (currentVerification) {
      if (currentVerification.verificationCode.isExpired()) {
        currentVerification.refreshVerificationCode();
        await this.verificationRepository.update(currentVerification);
      }

      return { verificationCode: currentVerification.verificationCode.code };
    }

    const verificationCode = VerificationCode.create();
    let verification = Verification.create({ verificationCode, user: dto.user });

    verification = await this.verificationRepository.create(verification);

    return { verificationCode: verificationCode.code };
  }
}
