import { Card, List, Text } from '@/ui/components';
import { formatTimezone } from '@/utils/date';
import { useMatchesQuery } from './Admin/Matches/MatchesQuery';

export function Matches() {
  const { matches } = useMatchesQuery();

  return (
    <div className="space-y-2">
      <Text as="h2" variant="subtitle">
        Partidas da temporada
      </Text>
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
