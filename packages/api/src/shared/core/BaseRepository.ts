import { AggregateRoot, Identifier } from '../domain';

export interface BaseRepository<Entity extends AggregateRoot<any, any>> {
  create(entity: Entity): Promise<void>;
  findById<I extends Identifier<any>>(id: I): Promise<Entity | null>;
  findAll(): Promise<Entity[]>;
}
