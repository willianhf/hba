import axios, { AxiosError } from 'axios';
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
  private static readonly httpClient = axios.create({
    baseURL: this.hostname
  });

  public static async fetchPlayersByName(search: string): Promise<NBAPlayer[]> {
    try {
      const response = await this.httpClient.get<NBAAPISearchPlayersResponse>('players', {
        params: {
          search
        }
      });

      const players = response.data.data.map(
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
      const response = await this.httpClient.get<NBAAPIPlayer>(`players/${nbaPlayerId.toValue()}`);
      if (!response.data.id) {
        throw new EntityNotFoundError('The provided NBA player does not exist');
      }

      return new NBAPlayer(
        { firstName: response.data.first_name, lastName: response.data.last_name },
        new UniqueIdentifier(response.data.id.toString())
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new UnexpectedError();
      }

      throw error;
    }
  }
}
