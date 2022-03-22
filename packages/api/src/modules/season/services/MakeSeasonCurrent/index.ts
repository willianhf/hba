import { prismaSeasonRepository } from '../../repos';
import { MakeSeasonCurrentService } from './MakeSeasonCurrent';

export const makeSeasonCurrentService = new MakeSeasonCurrentService(prismaSeasonRepository);
