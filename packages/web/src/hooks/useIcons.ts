import { relayEnvironment } from '@/lib/relay';
import { Writable } from '@/types/helpers';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { useIcons_iconsQuery, useIcons_iconsQuery$data } from './__generated__/useIcons_iconsQuery.graphql';

type Icons = Writable<useIcons_iconsQuery$data['icons']>;
export type Icon = Writable<Icons[number]>;

const ICONS_QUERY = graphql`
  query useIcons_iconsQuery {
    icons {
      id
      name
    }
  }
`;

const queryRef = loadQuery<useIcons_iconsQuery>(relayEnvironment, ICONS_QUERY, {});

export function useIcons() {
  const data = usePreloadedQuery(ICONS_QUERY, queryRef);

  return data.icons as Icons;
}
