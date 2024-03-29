import { matchResultWithRelations } from '~/modules/match/database';
import { MatchId, MatchResult, MatchResultId } from '~/modules/match/domain';
import { MatchResultMapper } from '~/modules/match/mapper/MatchResult';
import { SeasonId } from '~/modules/season/domain';
import { prisma } from '~/shared/infra/database';
import { MatchResultRepository } from '../../';

export class PrismaMatchResultRepository implements MatchResultRepository {
  public async create(matchResult: MatchResult): Promise<void> {
    const data = MatchResultMapper.toPersistence(matchResult);

    await prisma.matchResult.create({ data });
  }

  public async update(matchResult: MatchResult): Promise<void> {
    const data = MatchResultMapper.toPersistence(matchResult);

    await prisma.matchResult.update({
      where: {
        matchId: matchResult.match.id.toValue()
      },
      data
    });
  }

  public async findAll(): Promise<MatchResult[]> {
    throw new Error('Method not implemented');
  }

  public async findById(_id: MatchResultId): Promise<MatchResult | null> {
    throw new Error('Method not implemented');
  }

  public async findBySeason(seasonId: SeasonId): Promise<MatchResult[]> {
    const prismaMatchResults = await prisma.matchResult.findMany({
      where: {
        match: {
          seasonId: seasonId.toValue()
        }
      },
      ...matchResultWithRelations
    });

    return prismaMatchResults.map(MatchResultMapper.toDomain);
  }

  public async hasResult(matchId: MatchId): Promise<boolean> {
    const count = await prisma.matchResult.count({
      where: {
        matchId: matchId.toValue()
      }
    });

    return count > 0;
  }
}
