import { config as dotenv } from 'dotenv';

dotenv();

interface Config {
  isProduction: boolean;
  saltRounds: number;
}

type Environment = Partial<Config>;

function getEnvironment(): Environment {
  return {
    isProduction: process.env.NODE_ENV === 'production',
    saltRounds: 6
  };
}

function getConfig(environment: Environment): Config {
  for (const [key, value] of Object.entries(environment)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }

  return environment as Config;
}

const environment = getEnvironment();
const config = getConfig(environment);

export default config;
