import { Icons } from '../domain';

export interface PlayerIconRepository {
  create(icons: Icons): Promise<void>;
  save(icons: Icons): Promise<void>;
}
