import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

export const BCRYPT_SALT_ROUNDS = 12;
export const REFRESH_TOKEN_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 4001;
export const DATABASE_URL = process.env.DATABASE_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;

const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export const JWT_ACCESS_TOKEN_SECRET =
  getEnv("JWT_ACCESS_TOKEN_SECRET");

export const JWT_REFRESH_TOKEN_SECRET =
  getEnv("JWT_REFRESH_TOKEN_SECRET");

export const JWT_ACCESS_TOKEN_EXPIRES_IN =
  getEnv("JWT_ACCESS_TOKEN_EXPIRES_IN");

export const JWT_REFRESH_TOKEN_EXPIRES_IN =
  getEnv("JWT_REFRESH_TOKEN_EXPIRES_IN");

