import { useAuth } from '@/hooks';
import { parseErrorsFromAPI } from '@/lib/formik';
import { FormikErrors, FormikHelpers } from 'formik';
import { graphql, useMutation } from 'react-relay';
import { match } from 'ts-pattern';
import * as Yup from 'yup';
import { Button } from '../../Button';
import { Form } from '../../Form';
import { Link } from '../../Link';
import { TextInput } from '../../TextInput';
import { FormSignupMutation } from './__generated__/FormSignupMutation.graphql';

const SIGNUP_MUTATION = graphql`
  mutation FormSignupMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      __typename
      ... on CreateUserPayload {
        jwtToken
        verificationCode
        sessionId
        user {
          id
          username
          isAdmin
          isVerified
        }
      }
      ... on ValidationInputError {
        fields {
          field
          message
        }
        message
        name
        code
      }
    }
  }
`;

interface SignupFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .required('O nome de usuário é obrigatório.')
    .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres.')
    .max(25, 'O nome de usuário deve ter no máximo 25 caracteres.'),
  password: Yup.string().required('A senha é obrigatória.'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas não conferem.')
});

export function SignupForm() {
  const auth = useAuth();

  const [commit, isInFlight] = useMutation<FormSignupMutation>(SIGNUP_MUTATION);

  const initialValues: SignupFormValues = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  function onSignupSuccess(user: any, token: string, sessionId: string, verificationCode: string) {
    auth.onLogin(user, token, sessionId, verificationCode);
  }

  function onSignupError(helpers: FormikHelpers<SignupFormValues>, errors: FormikErrors<SignupFormValues>) {
    helpers.setErrors(errors);
  }

  function onSubmit(values: SignupFormValues, helpers: FormikHelpers<SignupFormValues>) {
    commit({
      variables: {
        input: {
          username: values.username,
          password: values.password
        }
      },
      onCompleted: data => {
        match(data.createUser)
          .with({ __typename: 'CreateUserPayload' }, createUser =>
            onSignupSuccess(createUser.user, createUser.jwtToken, createUser.sessionId, createUser.verificationCode)
          )
          .with({ __typename: 'ValidationInputError' }, error =>
            onSignupError(helpers, parseErrorsFromAPI(error.fields))
          )
          .run();
      }
    });
  }

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} validationSchema={signupSchema}>
      <div className="space-y-2">
        <TextInput
          label="Usuário"
          name="username"
          tooltip="Você deve utilizar o mesmo nome de usuário da sua conta do Habbo."
        />
        <TextInput.Password label="Senha" name="password" />
        <TextInput.Password label="Confirmar senha" name="confirmPassword" />
      </div>
      <div className="space-y-1 text-center">
        <Button type="submit" colorScheme="blue" className="w-full mt-5" isLoading={isInFlight}>
          Cadastrar
        </Button>
        <div className="text-gray-800">ou</div>
        <Button as={Link} href="?form=login" variant="link" colorScheme="blue">
          Entrar
        </Button>
      </div>
    </Form>
  );
}
