import dotenv from "dotenv";

dotenv.config();

export const MOD_ROLE_ID = process.env.MOD_ROLE_ID ?? "";
if (!MOD_ROLE_ID) {
  throw new Error("MOD_ROLE_ID environment variable is missing!")
}
