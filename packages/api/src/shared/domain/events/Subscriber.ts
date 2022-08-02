export interface Subscriber<IDomainEvent> {
  setupSubscriptions(): void;
}