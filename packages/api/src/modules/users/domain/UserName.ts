import { object, string } from 'yup';
import { ValueObject } from '~/shared/domain';

interface UserNameProps {
  name: string;
}

export class UserName extends ValueObject<UserNameProps> {
  public static readonly schema = object({
    name: string()
      .nullable()
      .required('Username is null or undefined')
      .min(3, 'Username is not at least ${min} characters')
      .max(25, 'Username greater than ${max} characters')
  });

  private constructor(props: UserNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.name;
  }

  public static create(props: UserNameProps): UserName {
    const validProps = this.schema.validateSync(props);

    return new UserName(validProps);
  }
}
