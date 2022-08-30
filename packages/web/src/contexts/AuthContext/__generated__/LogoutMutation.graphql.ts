/**
 * @generated SignedSource<<994a384f195b8d315a1bfe6cf644da36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LogoutInput = {
  clientMutationId?: string | null;
  sessionId: string;
};
export type LogoutMutation$variables = {
  input: LogoutInput;
};
export type LogoutMutation$data = {
  readonly logout: {
    readonly __typename: "ApplicationError";
    readonly message: string;
  } | {
    readonly __typename: "LogoutPayload";
    readonly itWorked: boolean;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type LogoutMutation = {
  variables: LogoutMutation$variables;
  response: LogoutMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
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
    "name": "logout",
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
            "name": "message",
            "storageKey": null
          }
        ],
        "type": "ApplicationError",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "itWorked",
            "storageKey": null
          }
        ],
        "type": "LogoutPayload",
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
    "name": "LogoutMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LogoutMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d9f7d7f9c2111685b73691c12c74b29d",
    "id": null,
    "metadata": {},
    "name": "LogoutMutation",
    "operationKind": "mutation",
    "text": "mutation LogoutMutation(\n  $input: LogoutInput!\n) {\n  logout(input: $input) {\n    __typename\n    ... on ApplicationError {\n      message\n    }\n    ... on LogoutPayload {\n      itWorked\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4eab9fdcf818a4a20988d66c4e1e9f18";

export default node;
