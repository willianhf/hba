import { Conference } from '@prisma/client';
import got from 'got';
import { log } from '../log';
import { prisma } from '../prisma';

interface NBATeamsAPIResponse {
  league: {
    standard: Array<{
      teamId: string;
      fullName: string;
      isNBAFranchise: boolean;
      nickname: string;
      tricode: string;
      confName: 'East' | 'West';
    }>;
  };
}

async function fetchNBATeams() {
  return got('http://data.nba.net/10s/prod/v1/2021/teams.json').json<NBATeamsAPIResponse>();
}

export async function seedNBATeams() {
  log('Seeding NBA Teams...');

  const data = await fetchNBATeams();

  await Promise.all(
    data.league.standard
      .filter(nbaTeam => nbaTeam.isNBAFranchise)
      .map(nbaTeam => {
        const team = {
          id: nbaTeam.teamId,
          name: nbaTeam.fullName,
          nickname: nbaTeam.nickname,
          tricode: nbaTeam.tricode,
          conference: nbaTeam.confName === 'East' ? Conference.EAST : Conference.WEST
        };

        prisma.nBATeam.upsert({
          where: { id: team.id },
          create: team,
          update: team
        });
      })
  );
}
