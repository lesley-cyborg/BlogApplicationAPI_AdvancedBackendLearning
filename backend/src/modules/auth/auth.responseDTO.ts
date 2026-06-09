import { ApiResponse } from "../../utils/api.response.js";

export type PublicUser = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserResponseDTO {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface RegisterResponseDTO {
  success: boolean;
  message: string;
  data: {
    user: UserResponseDTO;
    accessToken: string;
    refreshToken: string;
  };
}

const toUser = (user: PublicUser): UserResponseDTO => ({
  id: user.id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

export const authResponseDTO = {
  toUser,

  toRegisterResponse(
    user: PublicUser,
    accessToken: string,
    refreshToken: string
  ) {
    return ApiResponse.success("Account created successfully", {
      user: toUser(user),
      accessToken,
      refreshToken,
    });
  },
};