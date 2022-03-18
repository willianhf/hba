import { UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';
import { RequiredExceptFor } from '~/types/common';
import { User } from './User';

interface SessionProps {
  user: User;
  userAgent: string;
  createdAt: Date;
}

type CreateSessionProps = RequiredExceptFor<SessionProps, 'createdAt'>;

export class Session extends PersistableEntity<SessionProps, UniqueIdentifier> {
  private constructor(props: SessionProps, id?: UniqueIdentifier) {
    super(props, id);
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
