import got, { HTTPError } from 'got';
import { EntityNotFoundError, UnexpectedError } from '~/shared/core/Error';
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

  public static async fetchPlayersByName(search: string): Promise<NBAPlayer[]> {
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

  public static async fetchPlayerById(nbaPlayerId: UniqueIdentifier): Promise<NBAPlayer> {
    try {
      const response = await this.httpClient.get(`players.json`).json<NBAAPIPlayersResponse>();

      const player = response.league.standard.find(player => player.personId === nbaPlayerId.toValue());
      if (!player) {
        throw new EntityNotFoundError('The provided NBA player does not exist');
      }

      return new NBAPlayer(
        { firstName: player.firstName, lastName: player.lastName },
        new UniqueIdentifier(player.personId)
      );
    } catch (error) {
      if (error instanceof HTTPError) {
        throw new UnexpectedError();
      }

      throw error;
    }
  }
}
