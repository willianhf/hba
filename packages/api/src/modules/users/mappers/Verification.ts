import { Mapper } from '~/shared/core/Mapper';
import { UniqueIdentifier } from '~/shared/domain';
import { PersistedVerificationWithUser, ToPersistVerification } from '../database';
import { Verification, VerificationCode } from '../domain/Verification';
import { UserMapper } from './User';

export class VerificationMapper implements Mapper<Verification> {
  public static toPersistence(domain: Verification): ToPersistVerification {
    return {
      code: domain.verificationCode.serialize(),
      userId: domain.user.getId().toValue(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt
    };
  }

  public static toDomain(persisted: PersistedVerificationWithUser): Verification {
    const verificationId = new UniqueIdentifier(persisted.id);
    const verificationCode = VerificationCode.create(persisted.code);
    const user = UserMapper.toDomain(persisted.user);

    const verification = Verification.create(
      {
        verificationCode,
        createdAt: persisted.createdAt,
        updatedAt: persisted.updatedAt,
        user
      },
      verificationId
    );

    return verification;
  }
}
