import { z, ZodType } from "zod";
import { AuthTypes } from "../types/AuthTypes";

export const AuthFormSchema: ZodType<AuthTypes> = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export type IAuthFormSchema = z.infer<typeof AuthFormSchema>;
