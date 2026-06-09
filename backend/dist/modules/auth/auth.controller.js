import { catchAsync } from "../../utils/cacheAsync.js";
export const registerUserController = catchAsync(async (req, res) => {
    const { username, email, password } = req.body;
    console.log('=======================================');
    console.log({ username, email, password });
    console.log('=======================================');
    return res.status(201).json({
        success: true,
        message: "Account created successfully",
    });
});
