import { Service } from '~/shared/core/Service';
import { UniqueIdentifier } from '~/shared/domain';
import { TeamRepository } from '../../repos';

interface NBATeamAvailableDTO {
  nbaTeamId: UniqueIdentifier;
}

type NBATeamAvailableResult = boolean;

export class NBATeamAvailableService implements Service<NBATeamAvailableDTO, NBATeamAvailableResult> {
  public constructor(private teamRepository: TeamRepository) {}

  public async execute(dto: NBATeamAvailableDTO): Promise<boolean> {
    return this.teamRepository.isAvailable(dto.nbaTeamId);
  }
}
