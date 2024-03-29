import { Season } from '~/modules/season/domain/Season';
import { SeasonMapper } from '~/modules/season/mappers';
import { EntityNotFoundError } from '~/shared/core/Error';
import { IncIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { SeasonRepository } from '../..';

export class PrismaSeasonRepository implements SeasonRepository {
  public async findAll(): Promise<Season[]> {
    const prismaSeasons = await prisma.season.findMany();

    return prismaSeasons.map(SeasonMapper.toDomain);
  }

  public async findCurrent(): Promise<Season> {
    const prismaSeason = await prisma.season.findFirst({ where: { isCurrent: true } });
    if (!prismaSeason) {
      throw new EntityNotFoundError('There is no current season');
    }

    return SeasonMapper.toDomain(prismaSeason);
  }

  public async findById(id: IncIdentifier): Promise<Season | null> {
    const prismaSeason = await prisma.season.findUnique({ where: { id: id.toValue() } });
    if (!prismaSeason) {
      return null;
    }

    return SeasonMapper.toDomain(prismaSeason);
  }

  public async findByName(name: string): Promise<Season | null> {
    const prismaSeason = await prisma.season.findUnique({ where: { name } });
    if (!prismaSeason) {
      return null;
    }

    return SeasonMapper.toDomain(prismaSeason);
  }

  public async create(season: Season): Promise<Season> {
    const toPersist = SeasonMapper.toPersistence(season);
    const prismaSeason = await prisma.season.create({
      data: toPersist
    });

    return SeasonMapper.toDomain(prismaSeason);
  }

  public async makeSeasonCurrent(season: Season): Promise<void> {
    await prisma.season.updateMany({
      where: { isCurrent: true },
      data: { isCurrent: false }
    });

    await prisma.season.update({
      where: { id: season.id.toValue() },
      data: { isCurrent: true }
    });
  }
}
