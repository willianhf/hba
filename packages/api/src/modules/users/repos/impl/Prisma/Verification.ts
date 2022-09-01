import { User } from '~/modules/users/domain';
import { Verification } from '~/modules/users/domain/Verification';
import { VerificationMapper } from '~/modules/users/mappers';
import { prisma } from '~/shared/infra/database';
import { VerificationRepository } from '../..';

export class PrismaVerificationRepository implements VerificationRepository {
  public async create(verification: Verification): Promise<void> {
    const toPersist = VerificationMapper.toPersistence(verification);

    await prisma.verification.create({ data: toPersist });
  }

  public async findByUser(user: User): Promise<Verification | null> {
    const persistedVerification = await prisma.verification.findFirst({
      where: { user: { id: user.id.toValue() } },
      include: { user: true }
    });

    if (!persistedVerification) {
      return null;
    }

    const domainVerification = VerificationMapper.toDomain(persistedVerification);

    return domainVerification;
  }

  public async update(verification: Verification): Promise<void> {
    const toPersist = VerificationMapper.toPersistence(verification);

    await prisma.verification.update({
      where: { id: verification.id.toValue() },
      data: toPersist
    });
  }
}
