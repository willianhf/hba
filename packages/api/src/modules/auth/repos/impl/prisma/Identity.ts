import { Identity, IdentityId } from '~/modules/auth/domain';
import { IdentityMapper } from '~/modules/auth/mapper';
import { prisma } from '~/shared/infra/database';
import { IdentityRepository } from '../../Identity';

export class PrismaIdentityRepository implements IdentityRepository {
  async create(identity: Identity): Promise<void> {
    const data = IdentityMapper.toPersist(identity);

    await prisma.identity.create({ data });
  }

  async findById(_id: IdentityId): Promise<Identity | null> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Identity[]> {
    throw new Error('Method not implemented.');
  }
}
