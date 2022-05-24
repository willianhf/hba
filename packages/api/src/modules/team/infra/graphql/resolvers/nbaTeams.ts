import { prismaNBATeamRepository } from '~/modules/team/repos/impl/Prisma';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { NBATeamRef } from '../types/NBATeam';

schemaBuilder.queryField('nbaTeams', t =>
  t.field({
    type: [NBATeamRef],
    resolve: () => {
      return prismaNBATeamRepository.findAll();
    }
  })
);
