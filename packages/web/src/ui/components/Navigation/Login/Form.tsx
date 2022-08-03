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
        session {
          id
        }
        verification {
          code {
            value
          }
        }
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
            auth.onLogin(login.user, login.token, login.session.id, login.verification?.code.value)
          )
          .with({ __typename: 'ApplicationError' }, error => helpers.setFieldError('password', error.message))
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
