import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a correct email address" }),
  // name: z
  //   .string()
  //   .min(1, "Name is required")
  //   .max(40, "Name must be at most 40 characters long"),
  username: z
    .string()
    .min(1, "Username is required")
    .max(40, "Username must be at most 40 characters long")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Username is required and can only contain letters and numbers"
    ),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,40}$/,
      "8+ chars, 1 lowercase, 1 uppercase, 1 special"
    ),
  // confirmPassword: z.string(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   path: ["confirmPassword"],
//   message: "Passwords does not match",
// });

export type SignupFormFields = z.infer<typeof signupSchema>;
