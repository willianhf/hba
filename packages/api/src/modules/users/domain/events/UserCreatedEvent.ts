import { UniqueIdentifier } from '~/shared/domain';
import { IDomainEvent } from '~/shared/domain/events';
import { User } from '../User';

export class UserCreatedEvent implements IDomainEvent {
  public executedAt: Date;
  public user: User;

  constructor(user: User) {
    this.executedAt = new Date();
    this.user = user;
  }

  public getAggregateId(): UniqueIdentifier {
    return this.user.id;
  }
}
