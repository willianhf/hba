import got from 'got';
import { EntityNotFoundError } from '~/shared/core/Error';
import { UniqueIdentifier } from '~/shared/domain';
import { HabboProfile } from '../domain';

interface HabboAPIUser {
  name: string;
  motto: string;
  uniqueId: string;
}

export class HabboAPIFacade {
  private static readonly hostname = 'https://www.habbo.com.br/api/public/';
  private static readonly httpClient = got.extend({ prefixUrl: this.hostname });

  public static async fetchProfile(nickname: string): Promise<HabboProfile | null> {
    try {
      const response = await this.httpClient.get(`users?name=${nickname}`).json<HabboAPIUser>();

      if (response.name.toLowerCase() !== nickname.toLowerCase()) {
        return null;
      }

      return new HabboProfile(
        {
          name: response.name,
          motto: response.motto
        },
        new UniqueIdentifier(response.uniqueId)
      );
    } catch (ex) {
      return null;
    }
  }
}
