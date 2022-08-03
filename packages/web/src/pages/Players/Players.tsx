import { Suspense } from 'react';
import { PlayersList } from './PlayersList';
import { UserPlayers } from './User';

export function Players() {
  return (
    <div className="space-y-2">
      <UserPlayers />
      <Suspense fallback={null}>
        <PlayersList />
      </Suspense>
    </div>
  );
}
