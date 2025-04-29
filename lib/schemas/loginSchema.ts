import { z, ZodType } from "zod";
import { AuthTypes } from "../types/AuthTypes";

export const AuthFormSchema: ZodType<AuthTypes> = z.object({
  email: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])/, {
      message:
        "Password must include at least one lowercase letter, one uppercase letter, and one special character.",
    }),
});

export type IAuthFormSchema = z.infer<typeof AuthFormSchema>;
