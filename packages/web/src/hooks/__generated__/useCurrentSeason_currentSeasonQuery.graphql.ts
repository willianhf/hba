/**
 * @generated SignedSource<<84b4b8b39fa7ad06d938bf7e6bac4e94>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useCurrentSeason_currentSeasonQuery$variables = {};
export type useCurrentSeason_currentSeasonQuery$data = {
  readonly currentSeason: {
    readonly id: string;
    readonly name: string;
  };
};
export type useCurrentSeason_currentSeasonQuery = {
  variables: useCurrentSeason_currentSeasonQuery$variables;
  response: useCurrentSeason_currentSeasonQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Season",
    "kind": "LinkedField",
    "name": "currentSeason",
    "plural": false,
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
        "name": "name",
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
    "name": "useCurrentSeason_currentSeasonQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useCurrentSeason_currentSeasonQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "90ebfa5a01b72380f9b0c6742ce66e87",
    "id": null,
    "metadata": {},
    "name": "useCurrentSeason_currentSeasonQuery",
    "operationKind": "query",
    "text": "query useCurrentSeason_currentSeasonQuery {\n  currentSeason {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "e4f4d3f188bb632406c16680493d6ce8";

export default node;
