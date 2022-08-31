import { Form as FormikForm, Formik, FormikHelpers } from 'formik';
import { InferType, Schema } from 'yup';

interface Props<Values extends Record<string, any>> {
  initialValues: Values;
  onSubmit(values: InferType<Props<Values>['validationSchema']>, helpers: FormikHelpers<Values>): void | Promise<any>;
  validationSchema: Schema<any>;
  children: React.ReactNode;
}

export function Form<Values extends Record<string, any>>(props: Props<Values>) {
  async function onSubmit(values: InferType<typeof props.validationSchema>, helpers: FormikHelpers<Values>) {
    try {
      await props.onSubmit(values, helpers);
    } finally {
      helpers.setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validationSchema={props.validationSchema}
      validateOnChange={false}
    >
      <FormikForm>{props.children}</FormikForm>
    </Formik>
  );
}
