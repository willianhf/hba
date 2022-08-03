/**
 * @generated SignedSource<<63393e047cb1722bc4ca1b32ecbc53af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SignUpBanner_user$data = {
  readonly canRequestPlayer: boolean;
  readonly " $fragmentType": "SignUpBanner_user";
};
export type SignUpBanner_user$key = {
  readonly " $data"?: SignUpBanner_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SignUpBanner_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignUpBanner_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canRequestPlayer",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "2916c7066c177499672b92d4e401b662";

export default node;
