import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedVerificationWithUser, ToPersistVerification } from '../database';
import { Verification, VerificationCode } from '../domain/Verification';
import { UserMapper } from './User';

export class VerificationMapper implements Mapper<Verification> {
  public static toPersistence(domain: Verification): ToPersistVerification {
    return {
      code: domain.code.serialize(),
      userId: domain.user.id.toValue(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt
    };
  }

  public static toDomain(persisted: PersistedVerificationWithUser): Verification {
    const verificationId = new UniqueIdentifier(persisted.id);
    const code = VerificationCode.create(persisted.code);
    const user = UserMapper.toDomain(persisted.user);

    const verification = Verification.create(
      {
        code,
        user,
        createdAt: persisted.createdAt,
        updatedAt: persisted.updatedAt
      },
      verificationId
    );

    return verification;
  }
}
