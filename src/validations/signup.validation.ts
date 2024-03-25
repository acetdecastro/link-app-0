import { z } from "zod";

export const signupSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please provide a correct email address" }),
    username: z
      .string()
      .max(40, "Username must be at most 40 characters long")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Username must contain only letters and numbers"
      ),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,40}$/,
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 special character, and should be at least 8 characters long"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export type SignupFormFields = z.infer<typeof signupSchema>;
