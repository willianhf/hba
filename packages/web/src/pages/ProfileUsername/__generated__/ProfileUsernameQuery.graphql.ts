/**
 * @generated SignedSource<<520e1e258a913c2b104de82355c10882>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileUsernameQuery$variables = {
  username: string;
};
export type ProfileUsernameQuery$data = {
  readonly findUser: {
    readonly id?: string;
    readonly username?: string;
  } | null;
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"Players_user">;
  };
};
export type ProfileUsernameQuery = {
  variables: ProfileUsernameQuery$variables;
  response: ProfileUsernameQuery$data;
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
    "kind": "Variable",
    "name": "username",
    "variableName": "username"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647
  }
],
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileUsernameQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "findUser",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Players_user"
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileUsernameQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "findUser",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v3/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "UserPlayersConnection",
                "kind": "LinkedField",
                "name": "players",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserPlayersConnectionEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Player",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
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
                              },
                              (v2/*: any*/)
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
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Icon",
                            "kind": "LinkedField",
                            "name": "icons",
                            "plural": true,
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ClientExtension",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__id",
                        "storageKey": null
                      }
                    ]
                  }
                ],
                "storageKey": "players(first:2147483647)"
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "Profile_players",
                "kind": "LinkedHandle",
                "name": "players"
              },
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
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "daea229ea6ec410ba994423fd1d54e2f",
    "id": null,
    "metadata": {},
    "name": "ProfileUsernameQuery",
    "operationKind": "query",
    "text": "query ProfileUsernameQuery(\n  $username: String!\n) {\n  findUser(username: $username) {\n    __typename\n    ... on User {\n      id\n      username\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  user {\n    __typename\n    ... on User {\n      ...Players_user\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment PlayerFragment_player on Player {\n  status\n  nbaPlayer {\n    firstName\n    lastName\n    id\n  }\n  position {\n    name\n    id\n  }\n  icons {\n    name\n    id\n  }\n}\n\nfragment Players_user on User {\n  players(first: 2147483647) {\n    edges {\n      node {\n        id\n        ...PlayerFragment_player\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  canRequestPlayer\n}\n"
  }
};
})();

(node as any).hash = "5bb6bc74d416e25bb0b08de239503da5";

export default node;
