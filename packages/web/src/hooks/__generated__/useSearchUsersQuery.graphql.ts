/**
 * @generated SignedSource<<903d8990b651855898f64e7b06af8e47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useSearchUsersQuery$variables = {
  search: string;
};
export type useSearchUsersQuery$data = {
  readonly searchUsers: {
    readonly data?: ReadonlyArray<{
      readonly id: string;
      readonly username: string;
    }>;
  };
};
export type useSearchUsersQuery = {
  variables: useSearchUsersQuery$variables;
  response: useSearchUsersQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "data",
      "plural": true,
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "QuerySearchUsersSuccess",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useSearchUsersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "searchUsers",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useSearchUsersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "searchUsers",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "38f87f6934b16329cb2e97b2cc634529",
    "id": null,
    "metadata": {},
    "name": "useSearchUsersQuery",
    "operationKind": "query",
    "text": "query useSearchUsersQuery(\n  $search: String!\n) {\n  searchUsers(search: $search) {\n    __typename\n    ... on QuerySearchUsersSuccess {\n      data {\n        id\n        username\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f99c98da0620dd75436e208103f8ff12";

export default node;
