"use client"

import { useForm } from "react-hook-form";

import InputField from "@/app/components/ui/forms/input-field";
import { toast } from "sonner";

import { cn } from "@/lib/utils/general/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerUser } from "../actions/register-user";
import {
  type SignupFormData,
  signupSchema,
} from "../schemas/sign-up.schema";

function SignUpForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(formData: SignupFormData) {
    const result = await registerUser(formData);

    if (!result.success) {
      const messages = Object.values(result.errors).flat();
  
      toast.error("Registration failed", {
        description: messages.join("\n"),
      });
  
      return;
    }
    
    toast.success("User was registered successfully");
    
    router.push("/")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField
          id="firstName"
          type="text"
          label="First name"
          placeholder="John"
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <InputField
          id="lastName"
          type="text"
          label="Last name"
          placeholder="Doe"
          autoComplete="surname"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <InputField
        id="username"
        type="text"
        label="Username"
        placeholder="john_doe"
        autoComplete="username"
        error={errors.username?.message}
        {...register("username")}
      />

      <InputField
        id="email"
        type="email"
        label="Email"
        placeholder="john@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <InputField
        id="password"
        type="password"
        label="Password"
        placeholder="Enter a password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <InputField
        id="passwordConfirmation"
        type="password"
        label="Confirm password"
        placeholder="Repeat your password"
        autoComplete="new-password"
        error={errors.passwordConfirmation?.message}
        {...register("passwordConfirmation")}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full cursor-pointer rounded-md",
          "bg-emerald-500 px-4 py-2.5",
          "font-mono text-sm font-medium text-zinc-950",
          "transition hover:bg-emerald-400",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500",
          "focus:ring-offset-2 focus:ring-offset-zinc-950",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {isSubmitting
          ? "Creating account..."
          : "Create account"}
      </button>
    </form>
  );
}

export default SignUpForm;