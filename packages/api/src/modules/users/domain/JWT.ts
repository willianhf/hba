export interface JWTClaims {
  userId: string;
  sessionId: string;
}

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;
