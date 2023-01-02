import { differenceInHours, isSameDay } from "date-fns";
import dotenv from "dotenv";
import { db } from "../db.js";
import { type Team } from "./teams.js";

dotenv.config();

export interface ScheduleGame {
  home: Team;
  away: Team;
  dateTime: Date;
}

export async function saveScheduleGame(scheduleGame: ScheduleGame): Promise<void> {

  db.data?.scheduledGames.push(scheduleGame);

  await db.write();
}

async function cleanPastScheduledGames(): Promise<void> {
  db.data!.scheduledGames = db.data!.scheduledGames
    .filter(scheduleGame => {
      const difference = differenceInHours(new Date(scheduleGame.dateTime), new Date());

      return difference > 0 && difference < 24;
    });

  await db.write();
}

export async function getDailyScheduledGames(): Promise<ScheduleGame[]> {
  await db.read();

  cleanPastScheduledGames();

  const today = new Date();

  return db.data?.scheduledGames
    .filter(scheduledGame =>
      isSameDay(new Date(scheduledGame.dateTime), today)
    ) ?? [];
}

const hasMatchup = (scheduledGame: ScheduleGame, a: Team, b: Team) => (scheduledGame.home.name === a.name && scheduledGame.away.name === b.name) ||
  (scheduledGame.home.name === b.name && scheduledGame.away.name === a.name)

export async function isGameScheduled(a: Team, b: Team): Promise<ScheduleGame | null> {
  await db.read();

  return db.data?.scheduledGames
    .find(scheduledGame => hasMatchup(scheduledGame, a, b)) ?? null;
}

export async function removeScheduledGame(a: Team, b: Team): Promise<void> {
  db.data!.scheduledGames = db.data!.scheduledGames
    .filter(scheduledGame => !hasMatchup(scheduledGame, a, b));

  await db.write();
}
