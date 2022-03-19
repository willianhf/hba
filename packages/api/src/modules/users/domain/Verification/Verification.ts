import { UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';
import { RequiredExceptFor } from '~/types/common';
import { User } from '../User';
import { VerificationCode } from './VerificationCode';

interface VerificationProps {
  verificationCode: VerificationCode;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

type CreateVerificationProps = RequiredExceptFor<VerificationProps, 'createdAt' | 'updatedAt'>;

export class Verification extends PersistableEntity<VerificationProps, UniqueIdentifier> {
  private constructor(props: VerificationProps, id?: UniqueIdentifier) {
    super(props, id);
  }

  public static create(props: CreateVerificationProps, id?: UniqueIdentifier) {
    const habboAccount = new Verification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date()
      },
      id
    );

    return habboAccount;
  }

  public refreshVerificationCode(): void {
    this.props.verificationCode = VerificationCode.create();
  }

  get verificationCode(): VerificationCode {
    return this.props.verificationCode;
  }

  get user(): User {
    return this.props.user;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
