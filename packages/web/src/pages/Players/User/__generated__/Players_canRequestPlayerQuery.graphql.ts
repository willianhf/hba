/**
 * @generated SignedSource<<f59d8b12e1d9896dbad87b9505873111>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Players_canRequestPlayerQuery$variables = {};
export type Players_canRequestPlayerQuery$data = {
  readonly canRequestPlayer: boolean;
};
export type Players_canRequestPlayerQuery = {
  variables: Players_canRequestPlayerQuery$variables;
  response: Players_canRequestPlayerQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "canRequestPlayer",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Players_canRequestPlayerQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Players_canRequestPlayerQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "bc46cd9b7b02376edd1597db1f09a7ce",
    "id": null,
    "metadata": {},
    "name": "Players_canRequestPlayerQuery",
    "operationKind": "query",
    "text": "query Players_canRequestPlayerQuery {\n  canRequestPlayer\n}\n"
  }
};
})();

(node as any).hash = "f4e0d6995956e26009289f45d582af23";

export default node;
