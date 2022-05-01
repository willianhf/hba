import { Authenticated } from '@/ui/components';
import { Suspense } from 'react';
import { PlayersList } from './PlayersList';
import { UserPlayers } from './User';

export function Players() {
  return (
    <div className="space-y-2">
      <Authenticated>
        <UserPlayers />
      </Authenticated>
      <Suspense fallback={null}>
        <PlayersList />
      </Suspense>
    </div>
  );
}
