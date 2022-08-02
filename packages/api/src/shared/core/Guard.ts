import { Result } from '@swan-io/boxed';
import { SchemaOf } from 'yup';
import { ValidateOptions } from 'yup/lib/types';
import { z } from 'zod';

export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static async fromSchema<T>(schema: SchemaOf<any>, data: T, options?: ValidateOptions): Promise<true> {
    await schema.validate(data, options);

    return true;
  }

  public static fromZod<TSchema, TData>(
    schema: z.ZodSchema<TSchema>,
    data: TData,
    options?: Partial<z.ParseParams>
  ): Result<TSchema, z.ZodError<TSchema>> {
    const result = schema.safeParse(data, options);

    // const guardResult: IGuardResult = {
    //   succeeded: zodResult.success,
    //   message: !zodResult.success ? zodResult.error.message : undefined
    // };

    if (!result.success) {
      return Result.Error(result.error);
    }

    return Result.Ok(result.data);
  }
}
