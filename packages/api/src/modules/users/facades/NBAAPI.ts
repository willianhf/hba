import got from 'got';
import { UnexpectedError } from '~/shared/core/Error';
import { UniqueIdentifier } from '~/shared/domain';
import { NBAPlayer } from '../domain/NBAPlayer';

interface NBAAPIPlayersResponse {
  league: {
    standard: {
      personId: string;
      firstName: string;
      lastName: string;
    }[];
  };
}

export class NBAAPIFacade {
  private static readonly hostname = 'http://data.nba.net/10s/prod/v1/2021';
  private static readonly httpClient = got.extend({
    prefixUrl: this.hostname
  });

  public static async fetchPlayers(search: string): Promise<NBAPlayer[]> {
    try {
      const response = await this.httpClient.get('players.json').json<NBAAPIPlayersResponse>();

      const players = response.league.standard
        .filter(player => {
          const fullName = `${player.firstName} ${player.lastName}`.toLowerCase().trim();
          return fullName.includes(search.toLowerCase().trim());
        })
        .map(player => {
          return new NBAPlayer(
            { firstName: player.firstName, lastName: player.lastName },
            new UniqueIdentifier(player.personId)
          );
        });

      return players;
    } catch (error) {
      throw new UnexpectedError();
    }
  }
}
