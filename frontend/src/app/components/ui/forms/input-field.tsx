import { cn } from "@/lib/utils/general/cn";
import type { ComponentProps } from "react";

type InputFieldProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

function InputField({
  id,
  label,
  type = "text",
  error,
  className,
  ...props
}: InputFieldProps) {
  const isInvalid = Boolean(error);

  return (
    <div
      className="group space-y-2"
      data-invalid={isInvalid}
    >
      <label
        htmlFor={id}
        className={cn(
          "block font-mono text-sm text-zinc-300",
          "group-data-[invalid=true]:text-red-400",
        )}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        aria-invalid={isInvalid}
        aria-describedby={
          isInvalid ? `${id}-error` : undefined
        }
        className={cn(
          "w-full rounded-md border border-zinc-800 bg-zinc-900/50",
          "px-3 py-2.5 text-sm text-zinc-100",
          "placeholder:text-zinc-600",
          "outline-none transition",

          "focus:border-emerald-500",
          "focus:ring-1 focus:ring-emerald-500",

          "group-data-[invalid=true]:border-red-500",
          "group-data-[invalid=true]:focus:border-red-500",
          "group-data-[invalid=true]:focus:ring-red-500",

          className,
        )}
        {...props}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;
