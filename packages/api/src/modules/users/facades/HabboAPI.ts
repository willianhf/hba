import got from 'got';
import { ApplicationError, EntityNotFoundError } from '~/shared/core/Error';

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
      const response = await this.httpClient.get<HabboProfile>(`habbos/com.br/${nickname}`);

      return {
        name: response.body.name,
        motto: response.body.motto,
        habbo_id: response.body.habbo_id
      };
    } catch (error) {
      throw new EntityNotFoundError('Habbo profile not found.');
    }
  }
}