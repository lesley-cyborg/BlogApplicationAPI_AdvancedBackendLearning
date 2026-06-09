import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { FRONTEND_URL } from "./config/config.js";
import { globalErrorHandler } from "./middlewares/global.error.handler.middleware.js";
export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: FRONTEND_URL,
}));
app.get("/health-check", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Api is working fine!"
    });
});
import authRouter from "./modules/auth/auth.route.js";
app.use("/api/v1/auth", authRouter);
app.use(globalErrorHandler);
