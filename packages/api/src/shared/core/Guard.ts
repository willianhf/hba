import { SchemaOf } from 'yup';
import { ValidateOptions } from 'yup/lib/types';

export class Guard {
  public static async fromSchema<T>(schema: SchemaOf<any>, data: T, options?: ValidateOptions): Promise<true> {
    await schema.validate(data, options);

    return true;
  }
}
