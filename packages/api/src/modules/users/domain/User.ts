import { ValidationInputError } from '~/shared/core/Error';
import { AggregateRoot, UniqueIdentifier } from '~/shared/domain';
import { OptionalExceptFor } from '~/types/common';
import { HabboAPIFacade } from '../facades/HabboAPI';
import { UserCreatedEvent } from './events';
import { HabboProfile } from './HabboProfile';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';

export interface UserProps {
  username: UserName;
  habboUsername: string;
  password: UserPassword;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt?: Date;
}

type CreateUserProps = OptionalExceptFor<UserProps, 'username'| 'password' | 'habboUsername' >;

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueIdentifier) {
    super(props, id ?? new UniqueIdentifier());
  }

  public static async register(props: CreateUserProps): Promise<User> {
    const user = User.create(props);

    user.addDomainEvent(new UserCreatedEvent(user));

    return user;
  }

  public static create(props: CreateUserProps, id?: UniqueIdentifier): User {
    const user = new User(
      {
        ...props,
        isAdmin: props.isAdmin ?? false,
        isVerified: props.isVerified ?? false
      },
      id
    );

    return user;
  }

  override get id(): UserId {
    return new UserId(this._id.toValue());
  }

  get username(): UserName {
    return this.props.username;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get isAdmin(): boolean {
    return this.props.isAdmin;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get habboUsername(): string {
    return this.props.habboUsername;
  }

  get habboProfile(): Promise<HabboProfile | null> {
    return HabboAPIFacade.fetchProfile(this.habboUsername);
  }
}
