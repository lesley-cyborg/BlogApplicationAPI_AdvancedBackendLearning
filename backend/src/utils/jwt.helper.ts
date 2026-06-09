import jwt, { SignOptions } from "jsonwebtoken";

import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} from "../config/config.js";

import { AppError } from "./AppError.js";

export interface JwtUserPayload {
  userId: string;
  email: string;
  username: string;
}

export const generateAccessToken = (
  payload: JwtUserPayload
): string => {
  return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn:
      JWT_ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const generateRefreshToken = (
  payload: JwtUserPayload
): string => {
  return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn:
      JWT_REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (
  token: string
): JwtUserPayload => {
  try {
    return jwt.verify(
      token,
      JWT_ACCESS_TOKEN_SECRET
    ) as JwtUserPayload;
  } catch {
    throw new AppError(
      "Invalid or expired access token",
      401
    );
  }
};

export const verifyRefreshToken = (
  token: string
): JwtUserPayload => {
  try {
    return jwt.verify(
      token,
      JWT_REFRESH_TOKEN_SECRET
    ) as JwtUserPayload;
  } catch {
    throw new AppError(
      "Invalid or expired refresh token",
      401
    );
  }
};