import { createUserVerificationUseCase } from '../CreateUserVerification';
import { fetchUserVerificationUseCase } from '../FetchUserVerification';
import { GetUserVerificationUseCase } from './UseCase';

export const getUserVerificationUseCase = new GetUserVerificationUseCase(
  fetchUserVerificationUseCase,
  createUserVerificationUseCase
);
