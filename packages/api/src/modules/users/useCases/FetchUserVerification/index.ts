import { prismaVerificationRepository } from "../../repos";
import { FetchUserVerificationUseCase } from "./UseCase";

export const fetchUserVerificationUseCase = new FetchUserVerificationUseCase(prismaVerificationRepository);