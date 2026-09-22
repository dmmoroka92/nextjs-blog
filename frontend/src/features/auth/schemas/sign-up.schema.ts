import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required"),

    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required"),

    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .regex(
        /^[A-Za-z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),

    email: z.email("Enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(
        /[a-z]/,
        "Password must contain a lowercase letter",
      )
      .regex(
        /[A-Z]/,
        "Password must contain an uppercase letter",
      )
      .regex(
        /\d/,
        "Password must contain a number",
      )
      .regex(
        /_/,
        "Password must contain an underscore",
      ),

    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine(
    (data) => data.password === data.passwordConfirmation,
    {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    },
  );

export type SignupFormData = z.infer<typeof signupSchema>;