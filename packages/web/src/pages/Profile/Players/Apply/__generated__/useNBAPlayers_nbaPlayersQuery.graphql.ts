/**
 * @generated SignedSource<<23300d248078059171dce57a1e9dea56>>
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
    readonly imageUrl: string;
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
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "size",
            "value": "Small"
          }
        ],
        "kind": "ScalarField",
        "name": "imageUrl",
        "storageKey": "imageUrl(size:\"Small\")"
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
    "cacheID": "4b5dba7e3b55ee178c084e3ff8294a22",
    "id": null,
    "metadata": {},
    "name": "useNBAPlayers_nbaPlayersQuery",
    "operationKind": "query",
    "text": "query useNBAPlayers_nbaPlayersQuery(\n  $search: String!\n) {\n  nbaPlayers(search: $search) {\n    id\n    firstName\n    lastName\n    imageUrl(size: Small)\n  }\n}\n"
  }
};
})();

(node as any).hash = "3c3454adf692b52ee28a58d414630fae";

export default node;
