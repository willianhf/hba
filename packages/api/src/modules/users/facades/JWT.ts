import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import config from '~/config';
import { JWTClaims, JWTToken } from '../domain';

type JWTPayload = JWTClaims & JwtPayload;

export class JWTFacade {
  private static JWT_SECRET: string = config.jwtSecret;

  public static sign(claims: JWTClaims, options?: SignOptions): JWTToken {
    return sign(claims, this.JWT_SECRET, options);
  }

  public static verify(jwt: JWTToken): JWTPayload | false {
    try {
      const decoded = verify(jwt, this.JWT_SECRET);
      return decoded as JWTPayload;
    } catch (error) {
      return false;
    }
  }
}
