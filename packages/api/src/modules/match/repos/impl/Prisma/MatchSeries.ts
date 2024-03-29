import { MatchSeries, MatchSeriesId } from '~/modules/match/domain';
import { MatchSeriesMapper } from '~/modules/match/mapper';
import { SeasonId } from '~/modules/season/domain';
import { prisma } from '~/shared/infra/database';
import { MatchSeriesRepository } from '../..';

export class PrismaMatchSeriesRepository implements MatchSeriesRepository {
  public async create(matchSeries: MatchSeries): Promise<void> {
    const data = MatchSeriesMapper.toPersistence(matchSeries);

    await prisma.matchSeries.create({ data });
  }

  public async findAll(): Promise<MatchSeries[]> {
    const prismaMatchSeries = await prisma.matchSeries.findMany();

    return prismaMatchSeries.map(MatchSeriesMapper.toDomain);
  }

  public async findById(id: MatchSeriesId): Promise<MatchSeries | null> {
    const prismaMatchSeries = await prisma.matchSeries.findUnique({
      where: {
        id: id.toValue()
      }
    });

    if (!prismaMatchSeries) {
      return null;
    }

    return MatchSeriesMapper.toDomain(prismaMatchSeries);
  }

  public async findBySeason(seasonId: SeasonId): Promise<MatchSeries[]> {
    const prismaMatchSeries = await prisma.matchSeries.findMany({
      where: {
        seasonId: seasonId.toValue()
      }
    });

    return prismaMatchSeries.map(MatchSeriesMapper.toDomain);
  }

  public async findByName(seasonId: SeasonId, name: string): Promise<MatchSeries | null> {
    const prismaMatchSeries = await prisma.matchSeries.findUnique({
      where: {
        name_seasonId: {
          seasonId: seasonId.toValue(),
          name
        }
      }
    });

    if (!prismaMatchSeries) {
      return null;
    }

    return MatchSeriesMapper.toDomain(prismaMatchSeries);
  }
}
