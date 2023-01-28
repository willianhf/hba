import { z } from 'zod';
import { ValueObject } from '~/shared/domain';

const usernameProps = z.object({
  value: z
    .string({
      required_error: 'Usuário é obrigatório'
    })
    .min(3, 'Usuário deve ter no mínimo 3 caracteres')
    .max(25, 'Usuário deve ter no máximo 25 caracteres')
});

type UsernameProps = z.infer<typeof usernameProps>;

export class Username extends ValueObject<UsernameProps> {
  private constructor(props: UsernameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(props: UsernameProps): Username {
    const parsedProps = usernameProps.parse(props);

    return new Username(parsedProps);
  }
}
