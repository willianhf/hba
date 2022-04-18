/**
 * @generated SignedSource<<89684b6223846b2544dcd33f549f126e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useNBAPlayers_nbaPlayersQuery$variables = {
  search: string;
};
export type useNBAPlayers_nbaPlayersQuery$data = {
  readonly nbaPlayers: ReadonlyArray<{
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
  }>;
};
export type useNBAPlayers_nbaPlayersQuery = {
  variables: useNBAPlayers_nbaPlayersQuery$variables;
  response: useNBAPlayers_nbaPlayersQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "search",
        "variableName": "search"
      }
    ],
    "concreteType": "NBAPlayer",
    "kind": "LinkedField",
    "name": "nbaPlayers",
    "plural": true,
    "selections": [
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
        "name": "firstName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useNBAPlayers_nbaPlayersQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useNBAPlayers_nbaPlayersQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5fae8121ce4c9ed7d5c4c2f618c0b002",
    "id": null,
    "metadata": {},
    "name": "useNBAPlayers_nbaPlayersQuery",
    "operationKind": "query",
    "text": "query useNBAPlayers_nbaPlayersQuery(\n  $search: String!\n) {\n  nbaPlayers(search: $search) {\n    id\n    firstName\n    lastName\n  }\n}\n"
  }
};
})();

(node as any).hash = "4aa6d157420c35e8e5920dbf856accaa";

export default node;
