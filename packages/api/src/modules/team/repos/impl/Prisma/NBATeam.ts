import { NBATeam } from '~/modules/team/domain';
import { NBATeamMapper } from '~/modules/team/mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { NBATeamRepository } from '../..';

export class PrismaNBATeamRepository implements NBATeamRepository {
  public async findAll(): Promise<NBATeam[]> {
    const prismaNBATeams = await prisma.nBATeam.findMany();

    return prismaNBATeams.map(NBATeamMapper.toDomain);
  }

  public async findById(id: UniqueIdentifier): Promise<NBATeam> {
    const prismaNBATeam = await prisma.nBATeam.findUnique({
      where: {
        id: id.toValue()
      },
      rejectOnNotFound: true
    });

    return NBATeamMapper.toDomain(prismaNBATeam);
  }
}
