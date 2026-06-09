import { z } from "zod";
export const registerUserSchema = z.object({
    username: z.string().min(3, "Username must atleast be characters long"),
    email: z.string().email("Invalid email."),
    password: z.string().min(6, "Password must be atleast 6 characters long")
});
