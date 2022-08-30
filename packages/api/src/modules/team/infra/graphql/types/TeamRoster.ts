import { TeamRoster, TeamRosterRole } from '~/modules/team/domain';
import { prismaTeamRepository } from '~/modules/team/repos/impl/Prisma';
import { UserRef } from '~/modules/users/infra/graphql/types';
import { prismaUserRepository } from '~/modules/users/repos';
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
      resolve: async teamRoster => (await prismaTeamRepository.findById(teamRoster.teamId))!
    }),
    user: t.field({
      type: UserRef,
      resolve: teamRoster => prismaUserRepository.findById(teamRoster.userId)
    }),
    role: t.field({
      type: TeamRosterRoleRef,
      resolve: teamRoster => teamRoster.role
    })
  })
});
