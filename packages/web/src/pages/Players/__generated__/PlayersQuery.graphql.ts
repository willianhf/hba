/**
 * @generated SignedSource<<a51225c222e0d2361d08c31b92f8a73a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PlayersQuery$variables = {};
export type PlayersQuery$data = {
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"ApplyPlayerBanner_user">;
  };
};
export type PlayersQuery = {
  variables: PlayersQuery$variables;
  response: PlayersQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PlayersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ApplyPlayerBanner_user"
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PlayersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "user",
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
                "name": "canRequestPlayer",
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "type": "Node",
            "abstractKey": "__isNode"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0c6baa0cfd17d417bd1940269b3664b9",
    "id": null,
    "metadata": {},
    "name": "PlayersQuery",
    "operationKind": "query",
    "text": "query PlayersQuery {\n  user {\n    __typename\n    ... on User {\n      ...ApplyPlayerBanner_user\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ApplyPlayerBanner_user on User {\n  canRequestPlayer\n}\n"
  }
};

(node as any).hash = "e24b20b81429fa54f92da91d29b5d525";

export default node;
