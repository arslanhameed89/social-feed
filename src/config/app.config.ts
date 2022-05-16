import { registerAs } from '@nestjs/config'
import * as dotenv from 'dotenv'
dotenv.config()
const env = process.env

export default registerAs('APP', () => ({
  HOST: env.HOST || '127.0.0.1',
  PORT: env.PORT ? parseInt(env.PORT, 10) : 3000,
  SERVER: env.SERVER || 'http://localhost:3000',
  APP_NAME: env.APP_NAME || 'SOCIAL-FEED',
  API_GLOBAL_PREFIX: env.API_GLOBAL_PREFIX || 'api/v1',
  DB: {
    MONGODB_URL:
      env.MONGODDB_CONNECTION_STRING || 'mongodb://localhost:27017/social-feed'
  },
  NODE_ENV: env.NODE_ENV || 'development',
  PAGINATION: {
    PER_PAGE: env.PAGINATION_PER_PAGE || 40
  },
  TIME_ZONE: env.TIME_ZONE || 'Asia/Dubai',
  WORKING_DIRECTORY: process.env.PWD || process.cwd(),
  IMAGE_SERVER_PATH: '/public',
  SALT_ROUND: env.SALT_ROUND ? parseInt(env.SALT_ROUND) : 10
}))
