import { prismaSessionRepository } from '../../repos';
import { ResolveRequestUserService } from './ResolveRequestUser';

export const resolveRequestUserService = new ResolveRequestUserService(prismaSessionRepository);