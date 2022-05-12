import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env;

export default registerAs('APP', () => ({
  HOST: env.HOST || '127.0.0.1',
  PORT: env.PORT ? parseInt(env.PORT, 10) : 3000,
  SERVER: env.SERVER || `http://localhost:3000`,
  APP_NAME: env.APP_NAME || `SOCIAL-FEED`,
  DB: {
    MONGODB_URL:
      env.MONGODDB_CONNECTION_STRING || 'mongodb://localhost/social-feed',
  },
  NODE_ENV: env.NODE_ENV || 'development',
  PAGINATION: {
    PER_PAGE: env.PAGINATION_PER_PAGE || 40,
  },
  TIME_ZONE: env.TIME_ZONE || 'Asia/Dubai',
  workingDirectory: process.env.PWD || process.cwd(),
}));
