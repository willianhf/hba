/**
 * @generated SignedSource<<9033b46ef6216beca65a992ccdb47c73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MatchKind = "ALLSTAR" | "FINAL" | "PLAYOFF" | "REGULAR" | "%future added value";
export type CreateMatchInput = {
  awayTeamId: string;
  clientMutationId?: string | null;
  homeTeamId: string;
  matchKind: MatchKind;
  matchSeriesId?: string | null;
  scheduledTo?: Date | null;
};
export type MatchRegisterMutation$variables = {
  input: CreateMatchInput;
};
export type MatchRegisterMutation$data = {
  readonly createMatch: {
    readonly __typename: "ValidationInputError";
    readonly code: string;
    readonly fields: ReadonlyArray<{
      readonly field: string | null;
      readonly message: string;
    }>;
    readonly message: string;
    readonly name: string;
  } | {
    readonly __typename: "CreateMatchPayload";
    readonly match: {
      readonly id: string;
      readonly kind: MatchKind;
      readonly homeTeam: {
        readonly id: string;
      };
      readonly awayTeam: {
        readonly id: string;
      };
      readonly scheduledTo: Date | null;
      readonly series: {
        readonly id: string;
        readonly name: string;
      } | null;
    };
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type MatchRegisterMutation = {
  variables: MatchRegisterMutation$variables;
  response: MatchRegisterMutation$data;
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
  "name": "message",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
v5 = [
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
    "name": "createMatch",
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
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
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
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "type": "ValidationInputError",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Match",
            "kind": "LinkedField",
            "name": "match",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "kind",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Team",
                "kind": "LinkedField",
                "name": "homeTeam",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Team",
                "kind": "LinkedField",
                "name": "awayTeam",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "scheduledTo",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MatchSeries",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "type": "CreateMatchPayload",
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
    "name": "MatchRegisterMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MatchRegisterMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "8579e0f72cf356c2cf1d3818f481a33a",
    "id": null,
    "metadata": {},
    "name": "MatchRegisterMutation",
    "operationKind": "mutation",
    "text": "mutation MatchRegisterMutation(\n  $input: CreateMatchInput!\n) {\n  createMatch(input: $input) {\n    __typename\n    ... on ValidationInputError {\n      code\n      fields {\n        field\n        message\n      }\n      message\n      name\n    }\n    ... on CreateMatchPayload {\n      match {\n        id\n        kind\n        homeTeam {\n          id\n        }\n        awayTeam {\n          id\n        }\n        scheduledTo\n        series {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6aabb6879585f18ab395e1808aebdd09";

export default node;
