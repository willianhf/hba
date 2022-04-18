import { UniqueIdentifier } from '~/shared/domain';
import { Icon } from '../domain/Icon';

export interface IconRepository {
  findAll(): Promise<Icon[]>;
  findById(id: UniqueIdentifier): Promise<Icon | null>;
  findPlayerIcons(playerId: UniqueIdentifier): Promise<Icon[]>;
}
