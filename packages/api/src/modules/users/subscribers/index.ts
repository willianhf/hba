import { createUserVerificationUseCase } from '../useCases/CreateUserVerification';
import { UserCreatedSubscriber } from './UserCreatedSubscriber';

new UserCreatedSubscriber(createUserVerificationUseCase);
