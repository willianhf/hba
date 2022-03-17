import * as bcrypt from 'bcrypt';
import { object, string, ValidationError } from 'yup';
import { ValueObject } from '~/shared/domain';
import { Result } from '~/shared/core';
import config from '~/config';

export interface UserPasswordProps {
  value: string;
  isHashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  public static readonly schema = object({
    value: string()
      .nullable()
      .required('Password is null or undefined')
      .when('$isHashed', {
        is: (isHashed: boolean) => isHashed,
        then: string().min(5, 'Password has to be at least ${min} characters'),
      }),
  });

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  get isHashed(): boolean {
    return !!this.props.isHashed;
  }

  private async compareHashPassword(
    plainText: string,
    hashed: string
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isHashed) {
      hashed = this.props.value;
      return this.compareHashPassword(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, config.saltRounds);
  }

  public async getHashedValue(): Promise<string> {
    if (this.isHashed) {
      return this.props.value;
    }

    return this.hashPassword(this.props.value);
  }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    try {
      this.schema.validateSync(props, {
        context: { isHashed: props.isHashed },
      });

      return Result.ok(
        new UserPassword({
          value: props.value,
          isHashed: props.isHashed,
        })
      );
    } catch (ex) {
      if (ex instanceof ValidationError) {
        return Result.fail<UserPassword>(ex.errors[0]);
      }

      if (ex instanceof Error) {
        return Result.fail<UserPassword>(ex.message);
      }

      return Result.fail<UserPassword>('Unexpected error');
    }
  }
}
