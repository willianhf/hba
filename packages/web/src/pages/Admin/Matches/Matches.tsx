import { Button, Card, Link, List, Text } from '@/ui/components';
import { formatTimezone } from '@/utils/date';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { useMatchesQuery } from './MatchesQuery';

export function Matches() {
  const { matches } = useMatchesQuery();

  // TODO: Add edit feature to each match

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Text as="h2" variant="subtitle">
          Partidas da temporada
        </Text>
        <Button as={Link} to="register" colorScheme="blue" className="space-x-2">
          <PlusCircleIcon className="flex-shrink-0 h-4 w-4 text-white" />
          <Text variant="small" color="white">
            Cadastrar
          </Text>
        </Button>
      </div>
      <List
        options={matches}
        renderItem={match => (
          <Card key={match.id} className="mb-2">
            <div className="flex justify-between items-center px-12">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 relative z-0 mb-1">
                  <img src={match.homeTeam.nbaTeam.imageUrl} className="h-24 object-cover absolute bottom-0" />
                </div>
                <Text variant="subtitle">{match.homeTeam.nbaTeam.nickname}</Text>
                <Text>0-0</Text>
              </div>
              <div className="text-center">
                <Text variant="small" color="secondary" weight="semibold">
                  {match.kind}
                </Text>
                <Text variant="lg" color="primary" weight="bold" as="p">
                  {match.scheduledTo ? formatTimezone(match.scheduledTo) : '-'}
                </Text>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 relative z-0 mb-1">
                  <img src={match.awayTeam.nbaTeam.imageUrl} className="h-24 object-cover absolute bottom-0" />
                </div>
                <Text variant="subtitle">{match.awayTeam.nbaTeam.nickname}</Text>
                <Text>0-0</Text>
              </div>
            </div>
          </Card>
        )}
      />
    </div>
  );
}
