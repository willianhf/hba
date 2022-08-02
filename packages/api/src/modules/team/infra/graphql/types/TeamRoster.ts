import { TeamRosterRole } from '@prisma/client';
import { PlayerRef } from '~/modules/player/infra/graphl/types/Player';
import { prismaPlayerRepository } from '~/modules/player/repos/impl/Prisma';
import { TeamRoster } from '~/modules/team/domain';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { schemaBuilder } from '~/shared/infra/graphql/builder';
import { TeamRef } from './Team';

const TeamRosterRoleRef = schemaBuilder.enumType(TeamRosterRole, { name: 'TeamRosterRole' });

export const TeamRosterRef = schemaBuilder.objectRef<TeamRoster>('TeamRoster');

schemaBuilder.node(TeamRosterRef, {
  id: {
    resolve: teamRoster => teamRoster.id.toString()
  },
  isTypeOf: teamRoster => teamRoster instanceof TeamRoster,
  fields: t => ({
    team: t.field({
      type: TeamRef,
      resolve: teamRoster => prismaTeamRepository.findById(teamRoster.teamId)
    }),
    player: t.field({
      type: PlayerRef,
      resolve: teamRoster => prismaPlayerRepository.findById(teamRoster.playerId)
    }),
    role: t.field({
      type: TeamRosterRoleRef,
      resolve: teamRoster => teamRoster.role
    })
  })
});
