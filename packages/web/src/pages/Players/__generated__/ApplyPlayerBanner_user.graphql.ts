/**
 * @generated SignedSource<<92d853ab60d91b2b80ad38980d61a755>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplyPlayerBanner_user$data = {
  readonly canRequestPlayer: boolean;
  readonly " $fragmentType": "ApplyPlayerBanner_user";
};
export type ApplyPlayerBanner_user$key = {
  readonly " $data"?: ApplyPlayerBanner_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplyPlayerBanner_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApplyPlayerBanner_user",
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

(node as any).hash = "24f7f2671c496780f832a22e032a5231";

export default node;
