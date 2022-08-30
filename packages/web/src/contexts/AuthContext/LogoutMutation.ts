import { graphql } from 'react-relay';

export const LOGOUT_MUTATION = graphql`
  mutation LogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      __typename
      ... on ApplicationError {
        message
      }
      ... on LogoutPayload {
        itWorked
      }
    }
  }
`;
