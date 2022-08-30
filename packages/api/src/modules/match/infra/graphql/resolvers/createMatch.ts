import { MatchSeriesId } from '~/modules/match/domain';
import { createMatchUseCase } from '~/modules/match/useCases';
import { TeamId } from '~/modules/team/domain';
import { ForbiddenError, ValidationInputError } from '~/shared/core';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { MatchKindRef, MatchRef } from '../types';

schemaBuilder.relayMutationField(
  'createMatch',
  {
    inputFields: t => ({
      matchKind: t.field({ type: MatchKindRef, required: true }),
      homeTeamId: t.globalID({ required: true }),
      awayTeamId: t.globalID({ required: true }),
      scheduledTo: t.field({ type: 'Date' }),
      matchSeriesId: t.globalID()
    })
  },
  {
    authScopes: {
      isLoggedIn: true,
      isAdmin: true
    },
    errors: {
      types: [ForbiddenError, ValidationInputError]
    },
    resolve: async (_parent, args) => {
      const homeTeamId = new TeamId(args.input.homeTeamId.id);
      const awayTeamId = new TeamId(args.input.awayTeamId.id);
      const scheduledTo = args.input.scheduledTo ?? undefined;
      const matchSeriesId = args.input.matchSeriesId ? new MatchSeriesId(args.input.matchSeriesId.id) : undefined;

      return createMatchUseCase.execute({
        matchKind: args.input.matchKind,
        homeTeamId,
        awayTeamId,
        scheduledTo,
        matchSeriesId
      });
    }
  },
  {
    outputFields: t => ({
      match: t.field({
        type: MatchRef,
        resolve: match => match
      })
    })
  }
);
