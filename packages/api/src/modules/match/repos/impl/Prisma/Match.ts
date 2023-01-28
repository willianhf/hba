import { matchWithRelations } from '~/modules/match/database';
import { Match, MatchId, MatchKind } from '~/modules/match/domain';
import { MatchMapper } from '~/modules/match/mapper';
import { SeasonId } from '~/modules/season/domain';
import { Team } from '~/modules/team/domain';
import { prisma } from '~/shared/infra/database';
import { MatchRepository } from '../../';

export class PrismaMatchRepository implements MatchRepository {
  public async create(match: Match): Promise<void> {
    const data = MatchMapper.toPersistence(match);
    await prisma.match.create({ data });
  }

  public async createMany(matches: Match[]): Promise<void> {
    const data = matches.map(MatchMapper.toPersistence);

    await prisma.match.createMany({ data });
  }

  public async exists(seasonId: SeasonId, teamA: Team, teamB: Team, kind: MatchKind): Promise<boolean> {
    const matchesCount = await prisma.match.count({
      where: {
        seasonId: seasonId.toValue(),
        OR: [
          {
            homeTeamId: teamA.id.toValue(),
            awayTeamId: teamB.id.toValue()
          },
          {
            homeTeamId: teamB.id.toValue(),
            awayTeamId: teamA.id.toValue()
          }
        ]
      }
    });

    return matchesCount > 0;
  }

  public async findAll(): Promise<Match[]> {
    const prismaMatches = await prisma.match.findMany(matchWithRelations);
    return prismaMatches.map(MatchMapper.toDomain);
  }

  public async findById(id: MatchId): Promise<Match | null> {
    const prismaMatch = await prisma.match.findUnique({
      where: {
        id: id.toValue()
      },
      ...matchWithRelations
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
      },
      ...matchWithRelations
    });

    return prismaMatches.map(MatchMapper.toDomain);
  }

  public async findRemaining(seasonId: SeasonId): Promise<Match[]> {
    const prismaMatches = await prisma.match.findMany({
      where: {
        seasonId: seasonId.toValue(),
        result: {
          is: null
        }
      },
      ...matchWithRelations
    });

    return prismaMatches.map(MatchMapper.toDomain);
  }
}
