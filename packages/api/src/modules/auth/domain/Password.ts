import * as bcrypt from 'bcrypt';
import { z } from 'zod';
import config from '~/config';
import { ValueObject } from '~/shared/domain';

const passwordProps = z
  .object({
    value: z.string({ required_error: 'Voce deve informar uma senha' }),
    isHashed: z.boolean().optional()
  })
  .superRefine((data, context) => {
    if (!data.isHashed && data.value.length < 5) {
      context.addIssue({
        code: z.ZodIssueCode.too_small,
        type: 'string',
        inclusive: true,
        minimum: 5,
        message: 'A senha deve ter no minimo 5 caracteres'
      });
    }
  });

type PasswordProps = z.infer<typeof passwordProps>;

export class Password extends ValueObject<PasswordProps> {
  private constructor(props: PasswordProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  get isHashed(): boolean {
    return !!this.props.isHashed;
  }

  private async compareHashPassword(plainText: string, hashed: string): Promise<boolean> {
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

  public static create(props: PasswordProps): Password {
    const parsedProps = passwordProps.parse(props);

    return new Password(parsedProps);
  }
}
