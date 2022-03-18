import { Service } from '~/shared/core/Service';
import { UniqueIdentifier } from '~/shared/domain';
import { JWTToken, User } from '../../domain';
import { JWTFacade } from '../../facades/JWT';
import { SessionRepository } from '../../repos';

interface ResolveRequestUserDTO {
  bearerToken?: JWTToken;
}

type ResolveRequestUserResponse = User | null;

export class ResolveRequestUserService implements Service<ResolveRequestUserDTO, ResolveRequestUserResponse> {
  public constructor(private readonly sessionRepository: SessionRepository) {}

  public async execute(dto: ResolveRequestUserDTO): Promise<ResolveRequestUserResponse> {
    if (!dto.bearerToken) {
      return null;
    }

    const [, jwtToken] = dto.bearerToken.split(' ');
    const decodedToken = JWTFacade.verify(jwtToken);
    if (!decodedToken) {
      return null;
    }

    const sessionId = new UniqueIdentifier(decodedToken.sessionId);
    const session = await this.sessionRepository.getById(sessionId);
    if (!session) {
      return null;
    }

    return session.user;
  }
}