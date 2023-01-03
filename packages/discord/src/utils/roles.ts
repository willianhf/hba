import { GuildMember } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

export const MOD_ROLE_ID = process.env.MOD_ROLE_ID ?? "";
if (!MOD_ROLE_ID) {
  throw new Error("MOD_ROLE_ID environment variable is missing!")
}

export const CAPTAIN_ROLE_ID = process.env.CAPTAIN_ROLE_ID ?? "";
if (!CAPTAIN_ROLE_ID) {
  throw new Error("CAPTAIN_ROLE_ID environment variable is missing!")
}

export const PORTUGUESE_ROLE_ID = process.env.PORTUGUESE_ROLE_ID ?? "";
if (!PORTUGUESE_ROLE_ID) {
  throw new Error("PORTUGUESE_ROLE_ID environment variable is missing!")
}

export function isPortuguese(member: GuildMember): boolean {
  return member.roles.cache.has(PORTUGUESE_ROLE_ID);
}
