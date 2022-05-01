/**
 * @generated SignedSource<<0cd023c719e666356c7136721cc9cfbf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type PlayersList_findPlayersQuery$variables = {
  seasonId: string;
};
export type PlayersList_findPlayersQuery$data = {
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
export type PlayersList_findPlayersQuery = {
  variables: PlayersList_findPlayersQuery$variables;
  response: PlayersList_findPlayersQuery$data;
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
    "name": "PlayersList_findPlayersQuery",
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
    "name": "PlayersList_findPlayersQuery",
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
    "cacheID": "20f03f33057d76ce652b0f7466a50331",
    "id": null,
    "metadata": {},
    "name": "PlayersList_findPlayersQuery",
    "operationKind": "query",
    "text": "query PlayersList_findPlayersQuery(\n  $seasonId: String!\n) {\n  findPlayers(seasonId: $seasonId) {\n    id\n    icons {\n      name\n      id\n    }\n    nbaPlayer {\n      firstName\n      lastName\n      imageUrl\n      id\n    }\n    position {\n      id\n      name\n    }\n    user {\n      username\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4d4bd48d7d42907f981ed25b11b4c326";

export default node;
