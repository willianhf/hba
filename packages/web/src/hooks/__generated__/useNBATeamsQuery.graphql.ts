/**
 * @generated SignedSource<<a49bfdba1095eb4ab4a5557b8eba944f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Conference = "EAST" | "WEST" | "%future added value";
export type useNBATeamsQuery$variables = {};
export type useNBATeamsQuery$data = {
  readonly nbaTeams: ReadonlyArray<{
    readonly conference: Conference;
    readonly id: string;
    readonly imageUrl: string;
    readonly isAvailable: boolean;
    readonly name: string;
    readonly nickname: string;
    readonly tricode: string;
  }>;
};
export type useNBATeamsQuery = {
  variables: useNBATeamsQuery$variables;
  response: useNBATeamsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "NBATeam",
    "kind": "LinkedField",
    "name": "nbaTeams",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "conference",
        "storageKey": null
      },
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
        "name": "imageUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isAvailable",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "nickname",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tricode",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useNBATeamsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useNBATeamsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "369eb83fca22324dd854a8269ed9e3d5",
    "id": null,
    "metadata": {},
    "name": "useNBATeamsQuery",
    "operationKind": "query",
    "text": "query useNBATeamsQuery {\n  nbaTeams {\n    conference\n    id\n    imageUrl\n    isAvailable\n    name\n    nickname\n    tricode\n  }\n}\n"
  }
};
})();

(node as any).hash = "42424275872bdf9c2fbbe5a5e2c88e07";

export default node;
