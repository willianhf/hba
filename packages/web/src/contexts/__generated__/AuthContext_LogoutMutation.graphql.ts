/**
 * @generated SignedSource<<1d61192d3fcceae5980355cb99871534>>
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
export type AuthContext_LogoutMutation$variables = {
  input: LogoutInput;
};
export type AuthContext_LogoutMutation$data = {
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
export type AuthContext_LogoutMutation = {
  variables: AuthContext_LogoutMutation$variables;
  response: AuthContext_LogoutMutation$data;
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
    "name": "AuthContext_LogoutMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthContext_LogoutMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9dec580ce019e5176199cf6d7e23471b",
    "id": null,
    "metadata": {},
    "name": "AuthContext_LogoutMutation",
    "operationKind": "mutation",
    "text": "mutation AuthContext_LogoutMutation(\n  $input: LogoutInput!\n) {\n  logout(input: $input) {\n    __typename\n    ... on ApplicationError {\n      message\n    }\n    ... on LogoutPayload {\n      itWorked\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1ae940e785ea63014b94bf4e897ab124";

export default node;
