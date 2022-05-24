import { Conference } from '@prisma/client';
import { NBATeam } from '~/modules/team/domain';
import { prismaNBATeamRepository } from '~/modules/team/repos/impl/Prisma';
import { isNBATeamAvailableService } from '~/modules/team/services/NBATeamAvailable';
import { UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';

export const NBATeamRef = schemaBuilder.objectRef<NBATeam>('NBATeam');

export const ConferenceRef = schemaBuilder.enumType(Conference, { name: 'Conference' });

schemaBuilder.node(NBATeamRef, {
  id: {
    resolve: nbaTeam => nbaTeam.getId().toValue()
  },
  loadOne: id => prismaNBATeamRepository.findById(new UniqueIdentifier(id)),
  isTypeOf: nbaTeam => nbaTeam instanceof NBATeam,
  fields: t => ({
    name: t.string({ resolve: nbaTeam => nbaTeam.name }),
    conference: t.field({ type: ConferenceRef, resolve: nbaTeam => nbaTeam.conference }),
    tricode: t.string({ resolve: nbaTeam => nbaTeam.tricode }),
    nickname: t.string({ resolve: nbaTeam => nbaTeam.nickname }),
    isAvailable: t.boolean({
      resolve: nbaTeam => isNBATeamAvailableService.execute({ nbaTeamId: nbaTeam.getId() })
    }),
    imageUrl: t.string({
      resolve: nbaTeam => {
        return `https://cdn.nba.com/logos/nba/${nbaTeam.getId()}/global/L/logo.svg`;
      }
    })
  })
});
