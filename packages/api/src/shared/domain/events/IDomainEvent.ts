import { Identifier } from '..';

export interface IDomainEvent {
  executedAt: Date;
  getAggregateId(): Identifier<any>;
}
