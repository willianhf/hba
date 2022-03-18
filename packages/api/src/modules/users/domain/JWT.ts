type UserId = string;
type SessionId = string;

export interface JWTClaims {
  userId: UserId;
  sessionId: SessionId;
}

export type JWTToken = string;