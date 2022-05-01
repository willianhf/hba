/**
 * @generated SignedSource<<343dbc316375bb3936062aa596b98190>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ApprovalStatus = "ACCEPTED" | "DENIED" | "IDLE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PlayerFragment_player$data = {
  readonly status: ApprovalStatus;
  readonly nbaPlayer: {
    readonly firstName: string;
    readonly lastName: string;
  } | null;
  readonly position: {
    readonly name: string;
  } | null;
  readonly icons: ReadonlyArray<{
    readonly name: string;
  }>;
  readonly " $fragmentType": "PlayerFragment_player";
};
export type PlayerFragment_player$key = {
  readonly " $data"?: PlayerFragment_player$data;
  readonly " $fragmentSpreads": FragmentRefs<"PlayerFragment_player">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PlayerFragment_player",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "NBAPlayer",
      "kind": "LinkedField",
      "name": "nbaPlayer",
      "plural": false,
      "selections": [
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Position",
      "kind": "LinkedField",
      "name": "position",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Icon",
      "kind": "LinkedField",
      "name": "icons",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Player",
  "abstractKey": null
};
})();

(node as any).hash = "b3f1374d18d4f66be6dcbbdd3d424d9c";

export default node;
