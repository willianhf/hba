import { UniqueIdentifier } from '~/shared/domain';
import { Icon, IconCategory } from '../domain';

export interface IconRepository {
  findAll(): Promise<Icon[]>;
  findById(id: UniqueIdentifier): Promise<Icon | null>;
  findPlayerIcons(playerId: UniqueIdentifier): Promise<Icon[]>;
  findByCategory(category: IconCategory): Promise<Icon[]>;
}
