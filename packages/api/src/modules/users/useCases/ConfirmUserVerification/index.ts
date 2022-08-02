import { prismaUserRepository, prismaVerificationRepository } from '../../repos';
import { ConfirmUserVerificationUseCase } from './UseCase';

export const confirmUserVerificationUseCase = new ConfirmUserVerificationUseCase(
  prismaVerificationRepository,
  prismaUserRepository
);
