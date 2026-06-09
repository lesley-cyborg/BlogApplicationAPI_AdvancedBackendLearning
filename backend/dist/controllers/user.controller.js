import prisma from "../prisma/client.ts";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
export const getUser = asyncHandler(async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: { id: req.params.id },
    });
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    res.status(200).json({
        success: true,
        data: user,
    });
});
