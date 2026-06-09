import { Request, Response } from "express";
import { catchAsync } from "../../utils/cacheAsync.js";
import { authService } from "./auth.service.js";
import { authResponseDTO } from "./auth.responseDTO.js";

export const registerUserController = catchAsync(
    async (req: Request, res: Response) => {
        const result = await authService.registerUser(req.body);

        const response = authResponseDTO.toRegisterResponse(
            result.user,
            result.accessToken,
            result.refreshToken,
        );
        
        return res.status(201).json(response);  
    },
);
