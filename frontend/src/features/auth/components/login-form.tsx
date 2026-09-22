"use client"

import InputField from "@/app/components/ui/forms/input-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "../schemas/login.schema";
import { cn } from "@/lib/utils/general/cn";
import { loginUser } from "../actions/login-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(formData: LoginFormData) {
    const result = await loginUser(formData)
    
    console.log("login result", result)
    
    if (!result.success) {
      const messages = Object.values(result.errors).flat();
  
      toast.error("Login failed", {
        description: messages.join("\n"),
      });
  
      return;
    }
    
    toast.success("User was signed in successfully");
    
    router.push("/")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <InputField
        id="email"
        type="email"
        label="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <InputField
        id="password"
        type="password"
        label="password"
        autoComplete="current-password"
        placeholder="Enter a password"
        error={errors.password?.message}
        {...register("password")}
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
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  )
}

export default LoginForm
