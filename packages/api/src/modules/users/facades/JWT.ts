import { sign, SignOptions, verify } from 'jsonwebtoken';
import config from '~/config';
import { JWTClaims, JWTToken } from '../domain';

export class JWTFacade {
  private static JWT_SECRET: string = config.jwtSecret;

  public static sign(claims: JWTClaims, options?: SignOptions): JWTToken {
    return sign(claims, this.JWT_SECRET, options);
  }

  public static verify(jwt: JWTToken): boolean {
    try {
      verify(jwt, this.JWT_SECRET);

      return true;
    } catch (error) {
      return false;
    }
  }
}
