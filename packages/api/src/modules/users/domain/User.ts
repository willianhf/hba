import { UniqueIdentifier } from '~/shared/domain';
import { PersistableEntity } from '~/shared/domain/Entity';
import { Nullish, OptionalExceptFor } from '~/types/common';
import { HabboAPIFacade, HabboProfile } from '../facades/HabboAPI';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';

export interface UserProps {
  username: UserName;
  password: UserPassword;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt?: Date;
}

type CreateUserProps = OptionalExceptFor<UserProps, 'username' | 'password'>;

export class User extends PersistableEntity<UserProps, UniqueIdentifier> {
  private habboProfile?: HabboProfile;

  private constructor(props: UserProps, id?: UniqueIdentifier) {
    super(props, id);
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

  public async getHabboProfile(): Promise<HabboProfile> {
    if (!this.habboProfile) {
      const fetchedHabboProfile = await HabboAPIFacade.fetchProfile(this.username.value);
      this.habboProfile = fetchedHabboProfile;
    }

    return this.habboProfile;
  }
}
