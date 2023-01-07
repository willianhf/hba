import { Conference } from '@prisma/client';
import got from 'got';
import { log } from '../log';
import { prisma } from '../prisma';

interface NBATeamsAPIResponse {
  data: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    full_name: string;
    name: string;
  }[];
}

async function fetchNBATeams() {
  return got('https://www.balldontlie.io/api/v1/teams').json<NBATeamsAPIResponse>();
}

export async function seedNBATeams() {
  log('Seeding NBA Teams...');

  const response = await fetchNBATeams();

  await Promise.all(
    response.data.map(nbaTeam => {
      const team = {
        id: nbaTeam.abbreviation,
        name: nbaTeam.full_name,
        nickname: nbaTeam.name,
        tricode: nbaTeam.abbreviation,
        conference: nbaTeam.conference === 'East' ? Conference.EAST : Conference.WEST
      };

      return prisma.nBATeam.upsert({
        where: { id: team.id },
        create: team,
        update: team
      });
    })
  );
}
