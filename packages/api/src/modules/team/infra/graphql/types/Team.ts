import { ApprovalStatusRef } from '~/modules/player/infra/graphl/types/Player';
import { Team } from '~/modules/team/domain';
import {
  prismaNBATeamRepository,
  prismaTeamRepository,
  prismaTeamRosterRepository
} from '~/modules/team/repos/impl/Prisma';
import { UniqueIdentifier } from '~/shared/domain';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { NBATeamRef } from './NBATeam';
import { TeamRosterRef } from './TeamRoster';

export const TeamRef = schemaBuilder.objectRef<Team>('Team');

schemaBuilder.node(TeamRef, {
  id: {
    resolve: team => team.getId().toValue()
  },
  loadOne: id => prismaTeamRepository.findById(new UniqueIdentifier(id)),
  isTypeOf: team => team instanceof Team,
  fields: t => ({
    status: t.field({
      type: ApprovalStatusRef,
      resolve: team => team.status
    }),
    rosters: t.field({
      type: [TeamRosterRef],
      resolve: team => prismaTeamRosterRepository.findByTeamId(team.getId())
    }),
    nbaTeam: t.field({
      type: NBATeamRef,
      resolve: team => prismaNBATeamRepository.findById(team.nbaTeamId)
    })
  })
});