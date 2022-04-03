import dotenv from 'dotenv';
dotenv.config();

let DATABASE_URL: string;
let DB_NAME: string;

switch (process.env.NODE_ENV) {
  case 'production':
    DB_NAME = process.env.DB_NAME_PRODUCTION as string;
    DATABASE_URL = process.env.DATABASE_URL_PRODUCTION as string;
    break;
  case 'development':
    DB_NAME = process.env.DB_NAME as string;
    DATABASE_URL = process.env.DATABASE_URL as string;
    break;
  case 'test':
    DB_NAME = process.env.DB_NAME_TEST as string;
    DATABASE_URL = process.env.DATABASE_URL_TEST as string;
}

const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_DRIVER = process.env.DB_DRIVER;

const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY as string;
const SALT = process.env.SALT as string;
const COOKIE_EXPIRE_TIME = (process.env.COOKIE_EXPIRE_TIME ||
  2 * 60 * 60) as number; // 2hours

export {
  DATABASE_URL,
  PORT,
  SECRET_KEY,
  SALT,
  COOKIE_EXPIRE_TIME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DRIVER,
  DB_NAME,
};
