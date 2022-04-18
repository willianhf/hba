/**
 * @generated SignedSource<<031928a0e65893be3d2b4836ec299629>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Players_findUserPlayersBySeasonQuery$variables = {};
export type Players_findUserPlayersBySeasonQuery$data = {
  readonly findUserPlayersBySeason: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"PlayerFragment_player">;
  }>;
};
export type Players_findUserPlayersBySeasonQuery = {
  variables: Players_findUserPlayersBySeasonQuery$variables;
  response: Players_findUserPlayersBySeasonQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Players_findUserPlayersBySeasonQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Player",
        "kind": "LinkedField",
        "name": "findUserPlayersBySeason",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PlayerFragment_player"
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
    "name": "Players_findUserPlayersBySeasonQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Player",
        "kind": "LinkedField",
        "name": "findUserPlayersBySeason",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "NBAPlayer",
            "kind": "LinkedField",
            "name": "nbaPlayer",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "firstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastName",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Position",
            "kind": "LinkedField",
            "name": "position",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Icon",
            "kind": "LinkedField",
            "name": "icons",
            "plural": true,
            "selections": (v1/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9c6d8902ac1d95d5a7b2844e1d58fc35",
    "id": null,
    "metadata": {},
    "name": "Players_findUserPlayersBySeasonQuery",
    "operationKind": "query",
    "text": "query Players_findUserPlayersBySeasonQuery {\n  findUserPlayersBySeason {\n    ...PlayerFragment_player\n    id\n  }\n}\n\nfragment PlayerFragment_player on Player {\n  id\n  status\n  nbaPlayer {\n    firstName\n    lastName\n    id\n  }\n  position {\n    name\n    id\n  }\n  icons {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "90d28bf14452d795ac52823170559a4b";

export default node;
