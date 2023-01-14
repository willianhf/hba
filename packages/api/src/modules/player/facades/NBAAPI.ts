import got, { HTTPError } from 'got';
import { EntityNotFoundError, UnexpectedError } from '~/shared/core/Error';
import { UniqueIdentifier } from '~/shared/domain';
import { NBAPlayer } from '../domain';

interface NBAAPIPlayer {
  id: number;
  first_name: string;
  last_name: string;
}

interface NBAAPISearchPlayersResponse {
  data: NBAAPIPlayer[];
}

export class NBAAPIFacade {
  private static readonly hostname = 'https://www.balldontlie.io/api/v1/';
  private static readonly httpClient = got.extend({
    prefixUrl: this.hostname
  });

  public static async fetchPlayersByName(search: string): Promise<NBAPlayer[]> {
    try {
      const response = await this.httpClient
        .get('players', {
          searchParams: {
            search
          }
        })
        .json<NBAAPISearchPlayersResponse>();

      const players = response.data.map(
        player =>
          new NBAPlayer(
            { firstName: player.first_name, lastName: player.last_name },
            new UniqueIdentifier(player.id.toString())
          )
      );

      return players;
    } catch (error) {
      throw new UnexpectedError();
    }
  }

  public static async fetchPlayerById(nbaPlayerId: UniqueIdentifier): Promise<NBAPlayer> {
    try {
      const response = await this.httpClient.get(`players/${nbaPlayerId.toValue()}`).json<NBAAPIPlayer>();
      if (!response.id) {
        throw new EntityNotFoundError('The provided NBA player does not exist');
      }

      return new NBAPlayer(
        { firstName: response.first_name, lastName: response.last_name },
        new UniqueIdentifier(response.id.toString())
      );
    } catch (error) {
      if (error instanceof HTTPError) {
        throw new UnexpectedError();
      }

      throw error;
    }
  }
}
