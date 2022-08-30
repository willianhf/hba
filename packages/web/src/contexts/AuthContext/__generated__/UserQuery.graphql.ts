/**
 * @generated SignedSource<<e8553ccca50894e25f8a3e18f952e4a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserQuery$variables = {};
export type UserQuery$data = {
  readonly user: {
    readonly id: string;
    readonly username: string;
    readonly canApplyTeam: boolean;
    readonly canRequestPlayer: boolean;
    readonly isAdmin: boolean;
    readonly isVerified: boolean;
  } | null;
};
export type UserQuery = {
  variables: UserQuery$variables;
  response: UserQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
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
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "canApplyTeam",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "canRequestPlayer",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isAdmin",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isVerified",
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
    "name": "UserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "bf29a5af78e79397291270a65528d9c5",
    "id": null,
    "metadata": {},
    "name": "UserQuery",
    "operationKind": "query",
    "text": "query UserQuery {\n  user {\n    id\n    username\n    canApplyTeam\n    canRequestPlayer\n    isAdmin\n    isVerified\n  }\n}\n"
  }
};
})();

(node as any).hash = "fcfb842f86fbabfda9d40141debbe15a";

export default node;
