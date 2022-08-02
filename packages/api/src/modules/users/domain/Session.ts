import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';
import { RequiredExceptFor } from '~/types/common';
import { User } from './User';

interface SessionProps {
  user: User;
  userAgent: string;
  createdAt: Date;
}

type CreateSessionProps = RequiredExceptFor<SessionProps, 'createdAt'>;

export class Session extends AggregateRoot<SessionProps> {
  private constructor(props: SessionProps, id?: UniqueIdentifier) {
    super(props, id ?? new UniqueIdentifier());
  }

  public static create(props: CreateSessionProps, id?: UniqueIdentifier): Session {
    return new Session({ ...props, createdAt: props.createdAt ?? new Date() }, id);
  }

  get user(): User {
    return this.props.user;
  }

  get userAgent(): string {
    return this.props.userAgent;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
