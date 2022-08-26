/**
 * @generated SignedSource<<b8e249982df13e7aea876dd861632e84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Conference = "EAST" | "WEST" | "%future added value";
export type TeamRosterRole = "CAPTAIN" | "CO_CAPTAIN" | "PLAYER" | "%future added value";
export type TeamsQuery$variables = {};
export type TeamsQuery$data = {
  readonly teams: ReadonlyArray<{
    readonly id: string;
    readonly nbaTeam: {
      readonly name: string;
      readonly conference: Conference;
      readonly imageUrl: string;
    };
    readonly managers: ReadonlyArray<{
      readonly id: string;
      readonly role: TeamRosterRole;
      readonly user: {
        readonly username: string;
      };
    }>;
  }>;
  readonly user: {
    readonly canApplyTeam: boolean;
  } | null;
};
export type TeamsQuery = {
  variables: TeamsQuery$variables;
  response: TeamsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "conference",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "canApplyTeam",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TeamsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Team",
        "kind": "LinkedField",
        "name": "teams",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NBATeam",
            "kind": "LinkedField",
            "name": "nbaTeam",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TeamRoster",
            "kind": "LinkedField",
            "name": "managers",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
          (v6/*: any*/)
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
    "name": "TeamsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Team",
        "kind": "LinkedField",
        "name": "teams",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NBATeam",
            "kind": "LinkedField",
            "name": "nbaTeam",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TeamRoster",
            "kind": "LinkedField",
            "name": "managers",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
          (v6/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "94992e9ad6f7217faa1f37964696de87",
    "id": null,
    "metadata": {},
    "name": "TeamsQuery",
    "operationKind": "query",
    "text": "query TeamsQuery {\n  teams {\n    id\n    nbaTeam {\n      name\n      conference\n      imageUrl\n      id\n    }\n    managers {\n      id\n      role\n      user {\n        username\n        id\n      }\n    }\n  }\n  user {\n    canApplyTeam\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1638604d5162c726c491710a35d5f92d";

export default node;
