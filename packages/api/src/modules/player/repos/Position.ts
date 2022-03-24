import { UniqueIdentifier } from '~/shared/domain';
import { Position } from '../domain/Position';

export interface PositionRepository {
  findAll(): Promise<Position[]>;
  findById(id: UniqueIdentifier): Promise<Position | null>;
}