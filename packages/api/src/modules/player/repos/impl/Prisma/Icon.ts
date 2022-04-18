import { Icon } from '~/modules/player/domain/Icon';
import { UniqueIdentifier } from '~/shared/domain';
import { prisma } from '~/shared/infra/database';
import { IconRepository } from '../../Icon';

export class PrismaIconRepository implements IconRepository {
  public async findAll(): Promise<Icon[]> {
    const prismaIcons = await prisma.icon.findMany();

    return prismaIcons.map(icon => new Icon(icon, new UniqueIdentifier(icon.id)));
  }

  public async findById(id: UniqueIdentifier): Promise<Icon | null> {
    const prismaIcon = await prisma.icon.findUnique({ where: { id: id.toValue() } });
    if (!prismaIcon) {
      return null;
    }

    return new Icon(prismaIcon, new UniqueIdentifier(prismaIcon.id));
  }

  public async findPlayerIcons(playerId: UniqueIdentifier): Promise<Icon[]> {
    const prismaIcons = await prisma.icon.findMany({
      where: {
        playerIcons: {
          every: { playerId: playerId.toValue() }
        }
      }
    });

    return prismaIcons.map(icon => new Icon(icon, new UniqueIdentifier(icon.id)));
  }
}
