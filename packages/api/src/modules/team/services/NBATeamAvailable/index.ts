import { prismaTeamRepository } from "../../repos/impl/Prisma";
import { NBATeamAvailableService } from "./NBATeamAvailable";

export const isNBATeamAvailableService = new NBATeamAvailableService(prismaTeamRepository);