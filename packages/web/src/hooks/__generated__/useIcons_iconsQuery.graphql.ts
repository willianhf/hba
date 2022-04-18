/**
 * @generated SignedSource<<93ac03052b25463688d49b5f2b127419>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useIcons_iconsQuery$variables = {};
export type useIcons_iconsQuery$data = {
  readonly icons: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
};
export type useIcons_iconsQuery = {
  variables: useIcons_iconsQuery$variables;
  response: useIcons_iconsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Icon",
    "kind": "LinkedField",
    "name": "icons",
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
    "name": "useIcons_iconsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useIcons_iconsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d7ded87aadc71dbd78655c5507c02a3b",
    "id": null,
    "metadata": {},
    "name": "useIcons_iconsQuery",
    "operationKind": "query",
    "text": "query useIcons_iconsQuery {\n  icons {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "95f70148836f0ad3be888e45a0fb9186";

export default node;
