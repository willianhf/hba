/**
 * @generated SignedSource<<c0676f7a146f41f7c020d5175e90d8ad>>
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
    readonly token: string;
    readonly verification: {
      readonly code: {
        readonly value: string;
      };
    };
    readonly session: {
      readonly id: string;
    };
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
  "name": "token",
  "storageKey": null
},
v4 = {
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Session",
  "kind": "LinkedField",
  "name": "session",
  "plural": false,
  "selections": [
    (v5/*: any*/)
  ],
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
    (v5/*: any*/),
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v9 = {
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
        (v8/*: any*/)
      ],
      "storageKey": null
    },
    (v8/*: any*/),
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FormSignupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Verification",
                "kind": "LinkedField",
                "name": "verification",
                "plural": false,
                "selections": [
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "type": "CreateUserPayload",
            "abstractKey": null
          },
          (v9/*: any*/)
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
    "name": "FormSignupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Verification",
                "kind": "LinkedField",
                "name": "verification",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "type": "CreateUserPayload",
            "abstractKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f57c35ba5727f09091cbaf2684a30bbc",
    "id": null,
    "metadata": {},
    "name": "FormSignupMutation",
    "operationKind": "mutation",
    "text": "mutation FormSignupMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    __typename\n    ... on CreateUserPayload {\n      token\n      verification {\n        code {\n          value\n        }\n        id\n      }\n      session {\n        id\n      }\n      user {\n        id\n        username\n        isAdmin\n        isVerified\n      }\n    }\n    ... on ValidationInputError {\n      fields {\n        field\n        message\n      }\n      message\n      name\n      code\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "71ffca5dff33fc4623586705ae06cb9a";

export default node;
