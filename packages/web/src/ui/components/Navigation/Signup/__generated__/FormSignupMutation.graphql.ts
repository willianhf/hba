/**
 * @generated SignedSource<<012adb7cb51bf6e53b2af51895171171>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateUserInput = {
  clientMutationId?: string | null;
  password: string;
  username: string;
};
export type FormSignupMutation$variables = {
  input: CreateUserInput;
};
export type FormSignupMutation$data = {
  readonly createUser: {
    readonly __typename: "CreateUserPayload";
    readonly jwtToken: string;
    readonly verificationCode: string;
    readonly sessionId: string;
    readonly user: {
      readonly id: string;
      readonly username: string;
      readonly isAdmin: boolean;
      readonly isVerified: boolean;
    };
  } | {
    readonly __typename: "ValidationInputError";
    readonly fields: ReadonlyArray<{
      readonly field: string | null;
      readonly message: string;
    }>;
    readonly message: string;
    readonly name: string;
    readonly code: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type FormSignupMutation = {
  variables: FormSignupMutation$variables;
  response: FormSignupMutation$data;
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
v2 = [
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
    "name": "createUser",
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
            "name": "jwtToken",
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
            "name": "sessionId",
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
        "type": "CreateUserPayload",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          }
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
    "name": "FormSignupMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FormSignupMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "9307d9a3f2fcd0a84c5d2f30c296384d",
    "id": null,
    "metadata": {},
    "name": "FormSignupMutation",
    "operationKind": "mutation",
    "text": "mutation FormSignupMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    __typename\n    ... on CreateUserPayload {\n      jwtToken\n      verificationCode\n      sessionId\n      user {\n        id\n        username\n        isAdmin\n        isVerified\n      }\n    }\n    ... on ValidationInputError {\n      fields {\n        field\n        message\n      }\n      message\n      name\n      code\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a69e13d4e02d79af754b5db203cac733";

export default node;
