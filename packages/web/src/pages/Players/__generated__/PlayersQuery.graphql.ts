/**
 * @generated SignedSource<<7f563fccfd47e7806c3efb370f839522>>
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
  } | null;
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
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ApplyPlayerBanner_user"
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
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "canRequestPlayer",
            "storageKey": null
          },
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
    ]
  },
  "params": {
    "cacheID": "c7b6e6271b0a7e18e9108d0d55fa4c1b",
    "id": null,
    "metadata": {},
    "name": "PlayersQuery",
    "operationKind": "query",
    "text": "query PlayersQuery {\n  user {\n    ...ApplyPlayerBanner_user\n    id\n  }\n}\n\nfragment ApplyPlayerBanner_user on User {\n  canRequestPlayer\n}\n"
  }
};

(node as any).hash = "e24b20b81429fa54f92da91d29b5d525";

export default node;
