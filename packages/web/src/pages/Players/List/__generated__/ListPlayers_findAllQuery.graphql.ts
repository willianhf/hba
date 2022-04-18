/**
 * @generated SignedSource<<ab8143aa95dbb07765962871cf7b2c15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ListPlayers_findAllQuery$variables = {
  seasonId: string;
};
export type ListPlayers_findAllQuery$data = {
  readonly findPlayers: ReadonlyArray<{
    readonly id: string;
    readonly icons: ReadonlyArray<{
      readonly name: string;
    }>;
    readonly nbaPlayer: {
      readonly firstName: string;
      readonly lastName: string;
      readonly imageUrl: string;
    } | null;
    readonly position: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly user: {
      readonly username: string;
    } | null;
  }>;
};
export type ListPlayers_findAllQuery = {
  variables: ListPlayers_findAllQuery$variables;
  response: ListPlayers_findAllQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "seasonId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "seasonId",
    "variableName": "seasonId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Position",
  "kind": "LinkedField",
  "name": "position",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ListPlayers_findAllQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Player",
        "kind": "LinkedField",
        "name": "findPlayers",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Icon",
            "kind": "LinkedField",
            "name": "icons",
            "plural": true,
            "selections": [
              (v3/*: any*/)
            ],
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v8/*: any*/)
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ListPlayers_findAllQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Player",
        "kind": "LinkedField",
        "name": "findPlayers",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Icon",
            "kind": "LinkedField",
            "name": "icons",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4b493f18fd6388803c2f9451b8869db1",
    "id": null,
    "metadata": {},
    "name": "ListPlayers_findAllQuery",
    "operationKind": "query",
    "text": "query ListPlayers_findAllQuery(\n  $seasonId: String!\n) {\n  findPlayers(seasonId: $seasonId) {\n    id\n    icons {\n      name\n      id\n    }\n    nbaPlayer {\n      firstName\n      lastName\n      imageUrl\n      id\n    }\n    position {\n      id\n      name\n    }\n    user {\n      username\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c42236bdfad5126aa08a3040b1728222";

export default node;
