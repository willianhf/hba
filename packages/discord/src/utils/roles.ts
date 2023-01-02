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
