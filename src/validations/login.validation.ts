import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a correct email address" }),
  password: z.string(),
});

export type LoginFormFields = z.infer<typeof loginSchema>;
