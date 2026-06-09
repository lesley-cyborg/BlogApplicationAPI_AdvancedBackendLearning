import bcrypt from "bcrypt";
import { AppError } from "./AppError.js";
import { BCRYPT_SALT_ROUNDS } from "../config/config.js";

/**
 * Hash a plain text password
 */
export const hashPassword = async (
  password: string
): Promise<string> => {
  if (!password) {
    throw new AppError("Password is required", 400);
  }

  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
};

/**
 * Compare a plain password with a hashed password
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  if (!plainPassword || !hashedPassword) {
    throw new AppError(
      "Password comparison failed",
      400
    );
  }

  return bcrypt.compare(
    plainPassword,
    hashedPassword
  );
};