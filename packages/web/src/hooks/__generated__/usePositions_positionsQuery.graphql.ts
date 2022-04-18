/**
 * @generated SignedSource<<1e808024486411be70a9d36013ad9a02>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type usePositions_positionsQuery$variables = {};
export type usePositions_positionsQuery$data = {
  readonly positions: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
};
export type usePositions_positionsQuery = {
  variables: usePositions_positionsQuery$variables;
  response: usePositions_positionsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Position",
    "kind": "LinkedField",
    "name": "positions",
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
    "name": "usePositions_positionsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "usePositions_positionsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "4e108c61646875a3f60486ad4ac831e4",
    "id": null,
    "metadata": {},
    "name": "usePositions_positionsQuery",
    "operationKind": "query",
    "text": "query usePositions_positionsQuery {\n  positions {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "f040f27067191ec3ef12fe6a76e45c3b";

export default node;
