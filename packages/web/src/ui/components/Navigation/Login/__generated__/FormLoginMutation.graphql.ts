/**
 * @generated SignedSource<<724f77fa19d73450ecacc0ff9b6d63e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginInput = {
  clientMutationId?: string | null;
  password: string;
  username: string;
};
export type FormLoginMutation$variables = {
  input: LoginInput;
};
export type FormLoginMutation$data = {
  readonly login: {
    readonly __typename: "LoginPayload";
    readonly sessionId: string;
    readonly verificationCode: string | null;
    readonly token: string;
    readonly user: {
      readonly id: string;
      readonly username: string;
      readonly isAdmin: boolean;
      readonly isVerified: boolean;
    };
  } | {
    readonly __typename: "ApplicationError";
    readonly code: string;
    readonly message: string;
    readonly name: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type FormLoginMutation = {
  variables: FormLoginMutation$variables;
  response: FormLoginMutation$data;
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
    "name": "login",
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
            "name": "sessionId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "verificationCode",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "token",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isAdmin",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isVerified",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "type": "LoginPayload",
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
            "kind": "ScalarField",
            "name": "message",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
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
    "name": "FormLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FormLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8c062b84d8f88f81bed8abe4528cfa2e",
    "id": null,
    "metadata": {},
    "name": "FormLoginMutation",
    "operationKind": "mutation",
    "text": "mutation FormLoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    __typename\n    ... on LoginPayload {\n      sessionId\n      verificationCode\n      token\n      user {\n        id\n        username\n        isAdmin\n        isVerified\n      }\n    }\n    ... on ApplicationError {\n      code\n      message\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "26c99105ed370bc70c8c5d997af21769";

export default node;
