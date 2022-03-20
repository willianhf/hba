import { prismaUserRepository, prismaVerificationRepository } from '../../repos';
import { ConfirmUserVerificationService } from './ConfirmUserVerification';

export const confirmUserVerificationService = new ConfirmUserVerificationService(prismaVerificationRepository, prismaUserRepository);