import { AppError } from "../../utils/AppError.js";
import { authRepository } from "./auth.repository.js";
import { registerUserDTO } from "./auth.schema.js";
import { hashPassword } from "../../utils/auth.helper.js";
import { REFRESH_TOKEN_EXPIRES_MS } from "../../config/config.js"
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.helper.js";

type AuthResponse = {
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  accessToken: string;
  refreshToken: string;
};

export const authService = {
  registerUser: async (body: registerUserDTO): Promise<AuthResponse> => {
    const { username, email, password } = body;

    // 1. Check existing user (username)
    const existingUserByUsername =
      await authRepository.findUserByUsername(username);

    if (existingUserByUsername) {
      throw new AppError("Username already exists", 400);
    }

    // 2. Check existing user (email)
    const existingUserByEmail =
      await authRepository.findUserByEmail(email);

    if (existingUserByEmail) {
      throw new AppError("Email already exists", 400);
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Create user
    const user = await authRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new AppError("Failed to create user", 500);
    }

    // 5. Create JWT payload (single source of truth)
    const jwtPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    // 6. Generate tokens
    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    // 7. Store refresh token (DB session tracking)
    await authRepository.createRefreshToken({
      userId: user.id,
      token: refreshToken,
      // ideally this should come from config instead of hardcoding
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS),
    });

    // 8. Return structured response
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
      refreshToken,
    };
  },
};