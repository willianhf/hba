import { UniqueIdentifier } from '~/shared/domain';
import { Position } from '../domain';

export interface PositionRepository {
  findAll(): Promise<Position[]>;
  findById(id: UniqueIdentifier): Promise<Position | null>;
}