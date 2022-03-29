/**
 * @generated SignedSource<<7ee4c97c7cfbd45c7abfd3b15a96dee9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SignupModalHabboProfileExistsQuery$variables = {
  username: string;
};
export type SignupModalHabboProfileExistsQuery$data = {
  readonly habboProfileExists: boolean;
};
export type SignupModalHabboProfileExistsQuery = {
  variables: SignupModalHabboProfileExistsQuery$variables;
  response: SignupModalHabboProfileExistsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "username"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "username",
        "variableName": "username"
      }
    ],
    "kind": "ScalarField",
    "name": "habboProfileExists",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignupModalHabboProfileExistsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignupModalHabboProfileExistsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e2d5114e3a1fcfbccd89b10a401654f9",
    "id": null,
    "metadata": {},
    "name": "SignupModalHabboProfileExistsQuery",
    "operationKind": "query",
    "text": "query SignupModalHabboProfileExistsQuery(\n  $username: String!\n) {\n  habboProfileExists(username: $username)\n}\n"
  }
};
})();

(node as any).hash = "fd7ca0dae62946261efcdd013bb67c0e";

export default node;
