import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedNBATeam } from '../database';
import { NBATeam } from '../domain';

export class NBATeamMapper extends Mapper<NBATeam> {
  public static toDomain(persisted: PersistedNBATeam): NBATeam {
    return new NBATeam(persisted, new UniqueIdentifier(persisted.id));
  }
}
