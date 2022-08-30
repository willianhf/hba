/**
 * @generated SignedSource<<f35cb2ecfcd78818592683827adcbd00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MatchKind = "ALLSTAR" | "FINAL" | "PLAYOFF" | "REGULAR" | "%future added value";
export type MatchesQuery$variables = {};
export type MatchesQuery$data = {
  readonly matches: ReadonlyArray<{
    readonly id: string;
    readonly kind: MatchKind;
    readonly scheduledTo: Date | null;
    readonly homeTeam: {
      readonly nbaTeam: {
        readonly nickname: string;
        readonly imageUrl: string;
      };
    };
    readonly awayTeam: {
      readonly nbaTeam: {
        readonly nickname: string;
        readonly imageUrl: string;
      };
    };
  }>;
};
export type MatchesQuery = {
  variables: MatchesQuery$variables;
  response: MatchesQuery$data;
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
  "name": "kind",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "scheduledTo",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nickname",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "NBATeam",
    "kind": "LinkedField",
    "name": "nbaTeam",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "storageKey": null
  }
],
v6 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "NBATeam",
    "kind": "LinkedField",
    "name": "nbaTeam",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/)
    ],
    "storageKey": null
  },
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MatchesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Match",
        "kind": "LinkedField",
        "name": "matches",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Team",
            "kind": "LinkedField",
            "name": "homeTeam",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Team",
            "kind": "LinkedField",
            "name": "awayTeam",
            "plural": false,
            "selections": (v5/*: any*/),
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
    "name": "MatchesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Match",
        "kind": "LinkedField",
        "name": "matches",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Team",
            "kind": "LinkedField",
            "name": "homeTeam",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Team",
            "kind": "LinkedField",
            "name": "awayTeam",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ff96c96312483fa024457821b0df9d64",
    "id": null,
    "metadata": {},
    "name": "MatchesQuery",
    "operationKind": "query",
    "text": "query MatchesQuery {\n  matches {\n    id\n    kind\n    scheduledTo\n    homeTeam {\n      nbaTeam {\n        nickname\n        imageUrl\n        id\n      }\n      id\n    }\n    awayTeam {\n      nbaTeam {\n        nickname\n        imageUrl\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a129a87fa099775f9259ab3cf7b0c3d8";

export default node;
