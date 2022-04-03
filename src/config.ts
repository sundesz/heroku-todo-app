import dotenv from 'dotenv';
dotenv.config();

let DB_NAME: string;
let DB_USER: string;
let DB_PASSWORD: string;
let DB_HOST: string;

switch (process.env.NODE_ENV) {
  case 'production':
    DB_NAME = process.env.DB_NAME_PRODUCTION as string;
    DB_USER = process.env.DB_USER_PRODUCTION as string;
    DB_PASSWORD = process.env.DB_PASSWORD_PRODUCTION as string;
    DB_HOST = process.env.DB_HOST_PRODUCTION as string;
    break;
  case 'development':
    DB_NAME = process.env.DB_NAME_DEVELOPMENT as string;
    DB_USER = process.env.DB_USER_DEVELOPMENT as string;
    DB_PASSWORD = process.env.DB_PASSWORD_DEVELOPMENT as string;
    DB_HOST = process.env.DB_HOST_DEVELOPMENT as string;
    break;
  case 'test':
    DB_NAME = process.env.DB_NAME_TEST as string;
    DB_USER = process.env.DB_USER_DEVELOPMENT as string;
    DB_PASSWORD = process.env.DB_PASSWORD_DEVELOPMENT as string;
    DB_HOST = process.env.DB_HOST_DEVELOPMENT as string;
}

const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY as string;
const SALT = process.env.SALT as string;
const COOKIE_EXPIRE_TIME = (process.env.COOKIE_EXPIRE_TIME ||
  2 * 60 * 60) as number; // 2hours

export {
  PORT,
  SECRET_KEY,
  SALT,
  COOKIE_EXPIRE_TIME,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
};
