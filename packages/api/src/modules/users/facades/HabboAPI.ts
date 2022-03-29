import got from 'got';
import { EntityNotFoundError } from '~/shared/core/Error';

export interface HabboProfile {
  name: string;
  motto: string;
  habbo_id: string;
}

export class HabboAPIFacade {
  private static readonly hostname = 'https://api.habboapi.net';
  private static readonly httpClient = got.extend({ prefixUrl: this.hostname });

  public static async fetchProfile(nickname: string): Promise<HabboProfile> {
    try {
      const response = await this.httpClient.get(`habbos/com.br/${nickname}`).json<HabboProfile>();

      if (response.name.toLowerCase() !== nickname.toLowerCase()) {
        throw new EntityNotFoundError('Habbo profile not found.');
      }

      return {
        name: response.name,
        motto: response.motto,
        habbo_id: response.habbo_id
      };
    } catch (error) {
      throw new EntityNotFoundError('Habbo profile not found.');
    }
  }

  public static async exists(nickname: string): Promise<boolean> {
    try {
      if (nickname.length <= 3) {
        return false;
      }

      await this.fetchProfile(nickname);

      return true;
    } catch (error) {
      return false;
    }
  }
}
