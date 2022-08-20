import { relayEnvironment } from '@/lib/relay';
import { Button, Card, Link, List, Text, Tooltip } from '@/ui/components';
import clsx from 'clsx';
import { loadQuery, usePreloadedQuery } from 'react-relay';
import { graphql } from 'relay-runtime';
import { TeamRosterRole, TeamsQuery } from './__generated__/TeamsQuery.graphql';

const TEAMS_PAGE_QUERY = graphql`
  query TeamsQuery {
    teams {
      edges {
        node {
          id
          nbaTeam {
            name
            conference
            imageUrl
          }
          managers {
            id
            role
            user {
              username
            }
          }
        }
      }
    }
    user {
      ... on User {
        canApplyTeam
      }
    }
  }
`;

const ROLES_LABELS: Record<TeamRosterRole, string | null> = {
  CAPTAIN: 'C',
  CO_CAPTAIN: 'S',
  PLAYER: null,
  '%future added value': null
};

const ROLES_STYLES: Record<TeamRosterRole, string | null> = {
  CAPTAIN: 'bg-green-200 text-green-600',
  CO_CAPTAIN: 'bg-yellow-200 text-yellow-600',
  PLAYER: null,
  '%future added value': null
};

const ROLE_TRANSLATIONS: Record<TeamRosterRole, string | null> = {
  CAPTAIN: 'Capitão',
  CO_CAPTAIN: 'Sub-capitão',
  PLAYER: null,
  '%future added value': null
};

interface RoleBadgeProps {
  role: TeamRosterRole;
}

function RoleBadge(props: RoleBadgeProps) {
  return (
    <Tooltip content={ROLE_TRANSLATIONS[props.role]}>
      <div
        className={clsx(
          'select-none cursor-default inline px-2 py-1 rounded-full text-sm font-semibold mr-2',
          ROLES_STYLES[props.role]
        )}
      >
        {ROLES_LABELS[props.role]}
      </div>
    </Tooltip>
  );
}

const teamsQueryRef = loadQuery<TeamsQuery>(relayEnvironment, TEAMS_PAGE_QUERY, {});

interface TeamProps {
  team: TeamsQuery['response']['teams']['edges'][number]['node'];
}

function Team({ team }: TeamProps) {
  return (
    <Card className="flex items-start w-full">
      <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 relative z-0">
        <img src={team.nbaTeam.imageUrl} className="h-24 object-cover absolute bottom-0" />
      </div>
      <div className="flex flex-col px-4 space-y-2">
        <Text variant="subtitle" className="block">
          {team.nbaTeam.name}
        </Text>
        <List
          options={team.managers}
          renderItem={manager => (
            <div key={manager.id}>
              <RoleBadge role={manager.role} />
              <Text variant="md">{manager.user.username}</Text>
            </div>
          )}
        />
      </div>
    </Card>
  );
}

interface ConferenceProps {
  title: 'Leste' | 'Oeste';
  items: TeamsQuery['response']['teams']['edges'];
}

export function Conference(props: ConferenceProps) {
  return (
    <div>
      <Text variant="subtitle" as="h2" className="mb-2">
        {props.title}
      </Text>
      <List
        options={props.items}
        renderItem={edge => <Team key={edge.node.id} team={edge.node} />}
        Empty={<Text>Nenhuma equipe inscrita</Text>}
      />
    </div>
  );
}

export function Teams() {
  const { teams, user } = usePreloadedQuery(TEAMS_PAGE_QUERY, teamsQueryRef);

  const east = teams.edges.filter(edge => edge.node.nbaTeam.conference === 'EAST');
  const west = teams.edges.filter(edge => edge.node.nbaTeam.conference === 'WEST');

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Text variant="title" as="h1">
          Equipes
        </Text>
        {user.canApplyTeam && (
          <Button as={Link} to="apply" variant="solid" colorScheme="red">
            Inscrever
          </Button>
        )}
      </div>
      <div className="space-y-2">
        <Conference title="Leste" items={east} />
        <Conference title="Oeste" items={west} />
      </div>
    </div>
  );
}
