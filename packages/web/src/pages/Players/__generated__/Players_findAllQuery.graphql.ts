/**
 * @generated SignedSource<<75b5d5a2517a6f6775eab49633369cfd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Players_findAllQuery$variables = {
  seasonId: number;
};
export type Players_findAllQuery$data = {
  readonly findPlayers: ReadonlyArray<{
    readonly id: string;
    readonly icons: ReadonlyArray<{
      readonly name: string;
    }>;
    readonly nbaPlayer: {
      readonly firstName: string;
      readonly lastName: string;
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
export type Players_findAllQuery = {
  variables: Players_findAllQuery$variables;
  response: Players_findAllQuery$data;
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
v7 = {
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
    "name": "Players_findAllQuery",
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
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v7/*: any*/)
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
    "name": "Players_findAllQuery",
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
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v7/*: any*/),
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
    "cacheID": "dcba947123780cd5cffd412db342a4cf",
    "id": null,
    "metadata": {},
    "name": "Players_findAllQuery",
    "operationKind": "query",
    "text": "query Players_findAllQuery(\n  $seasonId: Int!\n) {\n  findPlayers(seasonId: $seasonId) {\n    id\n    icons {\n      name\n      id\n    }\n    nbaPlayer {\n      firstName\n      lastName\n      id\n    }\n    position {\n      id\n      name\n    }\n    user {\n      username\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "58bfc2338093e901cb5955a43a0588a5";

export default node;
