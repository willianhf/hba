import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';
import { RequiredExceptFor } from '~/types/common';
import { User } from '../User';
import { VerificationCode } from './VerificationCode';

interface VerificationProps {
  code: VerificationCode;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

type CreateVerificationProps = RequiredExceptFor<VerificationProps, 'createdAt' | 'updatedAt'>;

export class Verification extends AggregateRoot<VerificationProps> {
  private constructor(props: VerificationProps, id?: UniqueIdentifier) {
    super(props, id ?? new UniqueIdentifier());
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
    this.props.code = VerificationCode.create();
  }

  get code(): VerificationCode {
    return this.props.code;
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
