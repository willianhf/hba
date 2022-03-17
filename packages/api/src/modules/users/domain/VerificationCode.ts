import { Result } from '~/shared/core';
import { ValueObject } from '~/shared/domain';

interface VerificationCodeProps {
  code: string;
  expiresAt: Date;
}

export class VerificationCode extends ValueObject<VerificationCodeProps> {
  private static readonly codeLength = 6;
  private static readonly expireInMinutes = 10;

  private constructor(props: VerificationCodeProps) {
    super(props);
  }

  get value(): VerificationCodeProps {
    return this.props;
  }

  get code(): string {
    return this.props.code;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }
  
  public isExpired(): boolean {
    const now = new Date();

    return now > this.expiresAt;
  }

  public isValid(code: string) : boolean {
    if (this.isExpired()) {
      return false;
    }

    return this.code.toUpperCase() === code.toUpperCase();
  }

  public serialize(): string {
    return JSON.stringify(this.value);
  }

  public static deserialize(serialized: string): VerificationCodeProps {
    const props: VerificationCodeProps = JSON.parse(serialized);

    return { ...props, expiresAt: new Date(props.expiresAt) };
  }

  public static create(serialized?: string): Result<VerificationCode> {
    if (serialized) {
      const deserialized = VerificationCode.deserialize(serialized);

      return Result.ok(new VerificationCode(deserialized));
    } 

    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let code = '';

    for (let i = 0; i < this.codeLength; i++) {
      code += chars[Math.round(Math.random() * (chars.length - 1))];
    }

    code = code.toUpperCase();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getHours() + this.expireInMinutes);

    return Result.ok(new VerificationCode({ code, expiresAt }));
  }
}
