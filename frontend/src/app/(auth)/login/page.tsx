import LoginForm from "@/features/auth/components/login-form";
import { cn } from "@/lib/utils/general/cn";
import Link from "next/link";

function LoginPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="mb-3 font-mono text-xs text-emerald-400">
          $ devlog login
        </p>

        <h1 className="font-mono text-3xl font-semibold tracking-tight text-zinc-100">
          Welcome back
          <span className="text-emerald-400">_</span>
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Sign in to continue writing, learning,
          and sharing.
        </p>
      </div>

      <LoginForm />

      <div className="mt-8 border-t border-zinc-800 pt-6">
        <p className="text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className={cn(
              "font-medium text-emerald-400",
              "transition hover:text-emerald-300"
            )}
          >
            Create an account →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
