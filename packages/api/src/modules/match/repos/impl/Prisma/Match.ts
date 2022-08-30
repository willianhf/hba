import { Match, MatchId } from '~/modules/match/domain';
import { MatchMapper } from '~/modules/match/mapper';
import { SeasonId } from '~/modules/season/domain';
import { prisma } from '~/shared/infra/database';
import { MatchRepository } from '../../';

export class PrismaMatchRepository implements MatchRepository {
  public async create(match: Match): Promise<void> {
    const data = MatchMapper.toPersistence(match);
    await prisma.match.create({ data });
  }

  public async findAll(): Promise<Match[]> {
    const prismaMatches = await prisma.match.findMany();
    return prismaMatches.map(MatchMapper.toDomain);
  }

  public async findById(id: MatchId): Promise<Match | null> {
    const prismaMatch = await prisma.match.findUnique({
      where: {
        id: id.toValue()
      }
    });

    if (!prismaMatch) {
      return null;
    }

    return MatchMapper.toDomain(prismaMatch);
  }

  public async findBySeason(seasonId: SeasonId): Promise<Match[]> {
    const prismaMatches = await prisma.match.findMany({
      where: {
        seasonId: seasonId.toValue()
      }
    });

    return prismaMatches.map(MatchMapper.toDomain);
  }
}
