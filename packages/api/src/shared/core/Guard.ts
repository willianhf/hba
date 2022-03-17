import { SchemaOf, ValidationError } from 'yup';
import { ValidateOptions } from 'yup/lib/types';

interface SuccessGuardResult {
  hasSucceeded: true;
  hasFailed: false;
}

interface FailureGuardResult {
  hasSucceeded: false;
  hasFailed: true;
  message: string;
}

type GuardResult = SuccessGuardResult | FailureGuardResult;

export class Guard {
  public static fromSchema<T>(
    schema: SchemaOf<any>,
    data: T,
    options?: ValidateOptions
  ): GuardResult {
    try {
      schema.validateSync(data, options);

      return { hasSucceeded: true, hasFailed: false };
    } catch (ex) {
      if (ex instanceof ValidationError) {
        return { hasSucceeded: false, hasFailed: true, message: ex.errors[0] };
      }

      if (ex instanceof Error) {
        return { hasSucceeded: false, hasFailed: true, message: ex.message };
      }

      return { hasSucceeded: false, hasFailed: true, message: 'Unknown error' };
    }
  }
}
