import { Position } from '~/modules/player/domain';
import { UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { PositionRepository } from '../../';

export class PrismaPositionRepository implements PositionRepository {
  public async findAll(): Promise<Position[]> {
    const prismaPositions = await prisma.position.findMany();

    return prismaPositions.map(position => new Position(position, new UniqueIdentifier(position.id)));
  }

  public async findById(id: UniqueIdentifier): Promise<Position | null> {
    const prismaPosition = await prisma.position.findUnique({ where: { id: id.toValue() } });
    if (!prismaPosition) {
      return null;
    }

    return new Position(prismaPosition, new UniqueIdentifier(prismaPosition.id));
  }
}
