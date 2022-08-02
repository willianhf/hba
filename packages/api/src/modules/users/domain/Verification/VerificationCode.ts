import { ValueObject } from '~/shared/domain';

interface VerificationCodeProps {
  value: string;
  expiresAt: Date;
}

export class VerificationCode extends ValueObject<VerificationCodeProps> {
  private static readonly codeLength = 6;
  private static readonly expireInMinutes = 10;

  private constructor(props: VerificationCodeProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  public isExpired(): boolean {
    const now = new Date();

    return now > this.expiresAt;
  }

  public isValid(code: string): boolean {
    if (this.isExpired()) {
      return false;
    }

    return this.value.toUpperCase() === code.toUpperCase();
  }

  public serialize(): string {
    return JSON.stringify(this.value);
  }

  public static deserialize(serialized: string): VerificationCodeProps {
    const props: VerificationCodeProps = JSON.parse(serialized);

    return { ...props, expiresAt: new Date(props.expiresAt) };
  }

  public static create(serialized?: string): VerificationCode {
    if (serialized) {
      const deserialized = VerificationCode.deserialize(serialized);

      return new VerificationCode(deserialized);
    }

    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let code = '';

    for (let i = 0; i < this.codeLength; i++) {
      code += chars[Math.round(Math.random() * (chars.length - 1))];
    }

    code = code.toUpperCase();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getHours() + this.expireInMinutes);

    return new VerificationCode({ value: code, expiresAt });
  }
}
