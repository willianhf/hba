import { graphql } from 'react-relay';

export const PROFILE_USERNAME_QUERY = graphql`
  query ProfileUsernameQuery($username: String!) {
    findUser(username: $username) {
      ... on User {
        id
        username
      }
    }
    user {
      ... on User {
        ...Players_user
      }
    }
  }
`;

