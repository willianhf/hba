import { db } from "../db.js";
import { type Team } from "./teams.js";

export interface Result {
  homeTeam: Team;
  homeTeamScore: number;
  awayTeam: Team;
  awayTeamScore: number;
}

export async function getResults(): Promise<Result[]> {
  await db.read();
  
  return db.data?.results ?? [];
}

export async function saveResult(result: Result): Promise<void> {
  db.data?.results.push(result);
  await db.write();
}

export async function resetResults(): Promise<void> {
  db.data!.results = [];
  await db.write();
}
