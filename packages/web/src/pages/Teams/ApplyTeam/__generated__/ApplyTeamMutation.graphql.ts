/**
 * @generated SignedSource<<4bdd98224270cadd59709cef260785a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ApplyTeamInput = {
  clientMutationId?: string | null;
  coCaptainUserId: string;
  nbaTeamId: string;
};
export type ApplyTeamMutation$variables = {
  input: ApplyTeamInput;
};
export type ApplyTeamMutation$data = {
  readonly applyTeam: {
    readonly __typename: "ApplyTeamPayload";
    readonly team: {
      readonly id: string;
    };
  } | {
    readonly __typename: "ValidationError";
    readonly code: string;
    readonly message: string;
    readonly name: string;
  } | {
    readonly __typename: "ValidationInputError";
    readonly code: string;
    readonly fields: ReadonlyArray<{
      readonly field: string | null;
      readonly message: string;
    }>;
    readonly message: string;
    readonly name: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type ApplyTeamMutation = {
  variables: ApplyTeamMutation$variables;
  response: ApplyTeamMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": null,
    "kind": "LinkedField",
    "name": "applyTeam",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Team",
            "kind": "LinkedField",
            "name": "team",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "type": "ApplyTeamPayload",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "type": "ValidationError",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ErrorField",
            "kind": "LinkedField",
            "name": "fields",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "field",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "type": "ValidationInputError",
        "abstractKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ApplyTeamMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ApplyTeamMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "b781ca5c90e42e7785a8b9a19f2bfb1e",
    "id": null,
    "metadata": {},
    "name": "ApplyTeamMutation",
    "operationKind": "mutation",
    "text": "mutation ApplyTeamMutation(\n  $input: ApplyTeamInput!\n) {\n  applyTeam(input: $input) {\n    __typename\n    ... on ApplyTeamPayload {\n      team {\n        id\n      }\n    }\n    ... on ValidationError {\n      code\n      message\n      name\n    }\n    ... on ValidationInputError {\n      code\n      fields {\n        field\n        message\n      }\n      message\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3f690d838d212b0578f52a5b058a1280";

export default node;
