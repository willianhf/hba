import { Authenticated, Text } from '@/ui/components';
import { Suspense } from 'react';
import { PlayersList } from './List';
import { PlayersUser } from './User';

export function Players() {
  return (
    <div className="space-y-4">
      <Authenticated>
        <PlayersUser />
      </Authenticated>
      <Text as="h1" variant="title" className="mb-1">
        Jogadores inscritos
      </Text>
      <Suspense fallback={null}>
        <PlayersList />
      </Suspense>
    </div>
  );
}
