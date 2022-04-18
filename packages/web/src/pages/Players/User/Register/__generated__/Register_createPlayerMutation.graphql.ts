/**
 * @generated SignedSource<<6ce571d5cdaef2cf2deacd224b8ecd7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreatePlayerInput = {
  clientMutationId?: string | null;
  iconsIds: ReadonlyArray<string>;
  nbaPlayerId: string;
  positionId: string;
};
export type Register_createPlayerMutation$variables = {
  input: CreatePlayerInput;
};
export type Register_createPlayerMutation$data = {
  readonly createPlayer: {
    readonly __typename: "CreatePlayerPayload";
    readonly player: {
      readonly id: string;
    };
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
    readonly __typename: "ApplicationError";
    readonly message: string;
    readonly name: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type Register_createPlayerMutation = {
  variables: Register_createPlayerMutation$variables;
  response: Register_createPlayerMutation$data;
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
v3 = [
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
    "name": "createPlayer",
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
            "concreteType": "Player",
            "kind": "LinkedField",
            "name": "player",
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
        "type": "CreatePlayerPayload",
        "abstractKey": null
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
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "type": "ApplicationError",
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
    "name": "Register_createPlayerMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Register_createPlayerMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "9918f44f10bc8473441ee16af7b75c2e",
    "id": null,
    "metadata": {},
    "name": "Register_createPlayerMutation",
    "operationKind": "mutation",
    "text": "mutation Register_createPlayerMutation(\n  $input: CreatePlayerInput!\n) {\n  createPlayer(input: $input) {\n    __typename\n    ... on CreatePlayerPayload {\n      player {\n        id\n      }\n    }\n    ... on ValidationInputError {\n      code\n      fields {\n        field\n        message\n      }\n      message\n      name\n    }\n    ... on ApplicationError {\n      message\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1fe6ea9a5cd2792244f63e0d26abdfa5";

export default node;
