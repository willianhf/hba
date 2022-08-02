import { DomainEvents, Subscriber } from '~/shared/domain/events';
import { UserCreatedEvent } from '../domain/events';
import { CreateUserVerificationUseCase } from '../useCases/CreateUserVerification/UseCase';

export class UserCreatedSubscriber implements Subscriber<UserCreatedEvent> {
  constructor(private createUserVerificationUseCase: CreateUserVerificationUseCase) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreatedEvent.bind(this), UserCreatedEvent.name);
  }

  private async onUserCreatedEvent(event: UserCreatedEvent): Promise<void> {
    const { user } = event;

    await this.createUserVerificationUseCase.execute({ user });
  }
}
