/**
 * @generated SignedSource<<cdb1a9317e5b8376e7daf64f20f9fb87>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MatchKind = "ALLSTAR" | "FINAL" | "PLAYOFF" | "REGULAR" | "%future added value";
export type MatchRegisterQuery$variables = {};
export type MatchRegisterQuery$data = {
  readonly matchKinds: ReadonlyArray<MatchKind>;
  readonly teams: ReadonlyArray<{
    readonly id: string;
    readonly nbaTeam: {
      readonly name: string;
      readonly imageUrl: string;
    };
  }>;
};
export type MatchRegisterQuery = {
  variables: MatchRegisterQuery$variables;
  response: MatchRegisterQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "matchKinds",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MatchRegisterQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Team",
        "kind": "LinkedField",
        "name": "teams",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NBATeam",
            "kind": "LinkedField",
            "name": "nbaTeam",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MatchRegisterQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Team",
        "kind": "LinkedField",
        "name": "teams",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NBATeam",
            "kind": "LinkedField",
            "name": "nbaTeam",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2a9cfca06865d2b313384429a80b41ef",
    "id": null,
    "metadata": {},
    "name": "MatchRegisterQuery",
    "operationKind": "query",
    "text": "query MatchRegisterQuery {\n  matchKinds\n  teams {\n    id\n    nbaTeam {\n      name\n      imageUrl\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e47edee5173cccdb20798843dbcdb2ba";

export default node;
