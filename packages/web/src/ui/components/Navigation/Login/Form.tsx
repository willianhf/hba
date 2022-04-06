import { useAuth } from '@/hooks';
import { FormikHelpers } from 'formik';
import { graphql, useMutation } from 'react-relay';
import { match } from 'ts-pattern';
import * as Yup from 'yup';
import { Button } from '../../Button';
import { Form } from '../../Form';
import { Link } from '../../Link';
import { TextInput } from '../../TextInput';
import { FormLoginMutation } from './__generated__/FormLoginMutation.graphql';

const LOGIN_MUTATION = graphql`
  mutation FormLoginMutation($input: LoginInput!) {
    login(input: $input) {
      __typename
      ... on LoginPayload {
        sessionId
        verificationCode
        token
        user {
          id
          username
          isAdmin
          isVerified
        }
      }
      ... on ApplicationError {
        code
        message
        name
      }
    }
  }
`;

interface LoginFormValues {
  username: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string().required('O nome de usuário é obrigatório.'),
  password: Yup.string().required('A senha é obrigatória.')
});

export function LoginForm() {
  const auth = useAuth();

  const [commit, isInFlight] = useMutation<FormLoginMutation>(LOGIN_MUTATION);

  const initialValues: LoginFormValues = {
    username: '',
    password: ''
  };

  function onLoginSuccess(user: any, token: string, sessionId: string, verificationCode: string | null) {
    auth.onLogin(user, token, sessionId, verificationCode);
  }

  function onLoginFailure(message: string, helpers: FormikHelpers<LoginFormValues>) {
    helpers.setFieldError('password', message);
  }

  function onSubmit(values: LoginFormValues, helpers: FormikHelpers<LoginFormValues>) {
    commit({
      variables: {
        input: {
          username: values.username,
          password: values.password
        }
      },
      onCompleted: data => {
        match(data.login)
          .with({ __typename: 'LoginPayload' }, login =>
            onLoginSuccess(login.user, login.token, login.sessionId, login.verificationCode)
          )
          .with({ __typename: 'ApplicationError' }, error => onLoginFailure(error.message, helpers))
          .run();
      }
    });
  }
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginSchema}>
      <div className="space-y-2">
        <TextInput label="Usuário" name="username" />
        <TextInput.Password label="Senha" name="password" />
      </div>
      <div className="space-y-1 text-center">
        <Button colorScheme="blue" className="w-full mt-5" isLoading={isInFlight}>
          Entrar
        </Button>
        <div className="text-gray-800">ou</div>
        <Button as={Link} href="?form=signup" variant="link" colorScheme="blue">
          Cadastrar
        </Button>
      </div>
    </Form>
  );
}
