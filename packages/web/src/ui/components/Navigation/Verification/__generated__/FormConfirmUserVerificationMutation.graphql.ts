/**
 * @generated SignedSource<<6ef9579bc6198bf5c9fb3170ec1c80d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ConfirmUserVerificationInput = {
  clientMutationId?: string | null;
};
export type FormConfirmUserVerificationMutation$variables = {
  input: ConfirmUserVerificationInput;
};
export type FormConfirmUserVerificationMutation$data = {
  readonly confirmUserVerification: {
    readonly __typename: "ApplicationError";
    readonly message: string;
  } | {
    readonly __typename: "AuthenticationError";
    readonly message: string;
  } | {
    readonly __typename: "ConfirmUserVerificationPayload";
    readonly itWorked: boolean;
    readonly user: {
      readonly id: string;
      readonly username: string;
      readonly isAdmin: boolean;
      readonly isVerified: boolean;
    };
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type FormConfirmUserVerificationMutation = {
  variables: FormConfirmUserVerificationMutation$variables;
  response: FormConfirmUserVerificationMutation$data;
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
    "args": null,
    "kind": "ScalarField",
    "name": "message",
    "storageKey": null
  }
],
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
    "name": "confirmUserVerification",
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
        "selections": (v1/*: any*/),
        "type": "ApplicationError",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": (v1/*: any*/),
        "type": "AuthenticationError",
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
        "type": "ConfirmUserVerificationPayload",
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
    "name": "FormConfirmUserVerificationMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FormConfirmUserVerificationMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a1d78a86142e820427ed0deb4e7ed83f",
    "id": null,
    "metadata": {},
    "name": "FormConfirmUserVerificationMutation",
    "operationKind": "mutation",
    "text": "mutation FormConfirmUserVerificationMutation(\n  $input: ConfirmUserVerificationInput!\n) {\n  confirmUserVerification(input: $input) {\n    __typename\n    ... on ApplicationError {\n      message\n    }\n    ... on AuthenticationError {\n      message\n    }\n    ... on ConfirmUserVerificationPayload {\n      itWorked\n      user {\n        id\n        username\n        isAdmin\n        isVerified\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "de838488722ee68c60c6057a7f660c5b";

export default node;
