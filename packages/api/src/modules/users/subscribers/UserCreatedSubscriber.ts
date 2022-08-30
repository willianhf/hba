import { DomainEvents, Subscriber } from '~/shared/domain/events';
import { UserCreatedEvent } from '../domain/events';

export class UserCreatedSubscriber implements Subscriber<UserCreatedEvent> {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreatedEvent.bind(this), UserCreatedEvent.name);
  }

  private async onUserCreatedEvent(event: UserCreatedEvent): Promise<void> {}
}
