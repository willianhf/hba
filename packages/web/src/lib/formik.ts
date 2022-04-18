import { FormikErrors } from 'formik';

interface APIFieldError {
  readonly field: string | null;
  readonly message: string;
}

export function parseErrorsFromAPI(errors: readonly APIFieldError[]): FormikErrors<any> {
  return errors.reduce((acc, error) => {
    if (error.field) {
      // @ts-ignore
      acc[error.field] = error.message;
    }

    return acc;
  }, {});
}
