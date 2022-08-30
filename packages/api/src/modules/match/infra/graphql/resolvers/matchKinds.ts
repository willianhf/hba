import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { MatchKindRef } from '../types';
import { MatchKind } from '~/modules/match/domain';

schemaBuilder.queryField('matchKinds', t =>
  t.field({
    type: [MatchKindRef],
    resolve: () => {
      return Object.values(MatchKind);
    }
  })
);
