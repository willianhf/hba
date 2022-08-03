/**
 * @generated SignedSource<<b5136514f0adc7f942716776c6ffeb32>>
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
    readonly session: {
      readonly id: string;
    };
    readonly verification: {
      readonly code: {
        readonly value: string;
      };
    } | null;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Session",
  "kind": "LinkedField",
  "name": "session",
  "plural": false,
  "selections": [
    (v3/*: any*/)
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "VerificationCode",
  "kind": "LinkedField",
  "name": "code",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "token",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v3/*: any*/),
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
},
v8 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FormLoginMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "login",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Verification",
                "kind": "LinkedField",
                "name": "verification",
                "plural": false,
                "selections": [
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "type": "LoginPayload",
            "abstractKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FormLoginMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "login",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Verification",
                "kind": "LinkedField",
                "name": "verification",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "type": "LoginPayload",
            "abstractKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "644873043f3099db7337be2804933260",
    "id": null,
    "metadata": {},
    "name": "FormLoginMutation",
    "operationKind": "mutation",
    "text": "mutation FormLoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    __typename\n    ... on LoginPayload {\n      session {\n        id\n      }\n      verification {\n        code {\n          value\n        }\n        id\n      }\n      token\n      user {\n        id\n        username\n        isAdmin\n        isVerified\n      }\n    }\n    ... on ApplicationError {\n      code\n      message\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "04334640ee7a1a0b864d4fcd77d1c336";

export default node;
