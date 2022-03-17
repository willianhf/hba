import { object, string, ValidationError } from 'yup';
import { ValueObject } from '~/shared/domain';
import { Result } from '~/shared/core';

interface UserNameProps {
  name: string;
}

export class UserName extends ValueObject<UserNameProps> {
  public static readonly schema = object({
    name: string()
      .nullable()
      .required('Username is null or undefined')
      .min(3, 'Username is not at least ${min} characters')
      .max(25, 'Username greater than ${max} characters'),
  });

  private constructor(props: UserNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.name;
  }

  public static create(props: UserNameProps): Result<UserName> {
    try {
      const validProps = this.schema.validateSync(props);

      return Result.ok(new UserName(validProps));
    } catch (ex) {
      if (ex instanceof ValidationError) {
        return Result.fail(ex.errors[0]);
      }

      if (ex instanceof Error) {
        return Result.fail<UserName>(ex.message);
      }

      return Result.fail<UserName>('Unexpected error');
    }
  }
}
