import { Formik, Form as FormikForm, FormikHelpers } from 'formik';

interface Props<Values extends Record<string, any>> {
  initialValues: Values;
  onSubmit(values: Values, helpers: FormikHelpers<Values>): void | Promise<any>;
  validationSchema?: any | (() => any);
  children: React.ReactNode;
}

export function Form<Values extends Record<string, any>>(props: Props<Values>) {
  async function onSubmit(values: Values, helpers: FormikHelpers<Values>) {
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
