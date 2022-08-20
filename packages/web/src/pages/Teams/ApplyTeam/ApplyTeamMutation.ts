import { graphql } from 'relay-runtime';

export const APPLY_TEAM_MUTATION = graphql`
  mutation ApplyTeamMutation($input: ApplyTeamInput!) {
    applyTeam(input: $input) {
      __typename
      ... on ApplyTeamPayload {
        team {
          id
        }
      }
      ... on ValidationError {
        code
        message
        name
      }
      ... on ValidationInputError {
        code
        fields {
          field
          message
        }
        message
        name
      }
    }
  }
`;
