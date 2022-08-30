import { graphql, useMutation } from 'react-relay';
import { MatchRegisterMutation } from './__generated__/MatchRegisterMutation.graphql';

const MATCH_REGISTER_MUTATION = graphql`
  mutation MatchRegisterMutation($input: CreateMatchInput!) {
    createMatch(input: $input) {
      __typename
      ... on ValidationInputError {
        code
        fields {
          field
          message
        }
        message
        name
      }
      ... on CreateMatchPayload {
        match {
          id
          kind
          homeTeam {
            id
          }
          awayTeam {
            id
          }
          scheduledTo
          series {
            id
            name
          }
        }
      }
    }
  }
`;

export function useMatchRegisterMutation() {
  return useMutation<MatchRegisterMutation>(MATCH_REGISTER_MUTATION);
}
