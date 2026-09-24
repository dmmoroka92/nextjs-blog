"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils/general/cn";

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  error?: string;
};

function TagInput({
  value,
  onChange,
  error,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  function addTag() {
    const tag = inputValue.trim().toLowerCase();

    if (!tag) {
      return;
    }

    if (value.includes(tag)) {
      setInputValue("");
      return;
    }

    onChange([...value, tag]);
    setInputValue("");
  }

  function removeTag(tagToRemove: string) {
    onChange(
      value.filter((tag) => tag !== tagToRemove),
    );
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
      return;
    }

    if (
      event.key === "Backspace" &&
      inputValue === "" &&
      value.length > 0
    ) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div
      className="group space-y-2"
      data-invalid={Boolean(error)}
    >
      <label
        htmlFor="tags"
        className={cn(
          "block text-sm font-medium text-zinc-200",
          "group-data-[invalid=true]:text-red-400",
        )}
      >
        Tags
      </label>

      <div
        className={cn(
          "flex min-h-11 flex-wrap items-center gap-2",
          "rounded-md border border-zinc-800",
          "px-3 py-2",
          "transition-colors",
          "focus-within:border-emerald-400",
          "group-data-[invalid=true]:border-red-500",
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className={cn(
              "flex items-center gap-1.5",
              "rounded-md bg-zinc-800",
              "px-2 py-1",
              "text-xs text-zinc-200",
            )}
          >
            {tag}

            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
              className={cn(
                "text-zinc-500",
                "transition-colors",
                "hover:text-zinc-200",
              )}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}

        <input
          id="tags"
          type="text"
          value={inputValue}
          onChange={(event) =>
            setInputValue(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={
            value.length === 0
              ? "Type a tag and press Enter"
              : ""
          }
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? "tags-error" : undefined
          }
          className={cn(
            "min-w-40 flex-1 bg-transparent",
            "text-sm text-zinc-100",
            "outline-none",
            "placeholder:text-zinc-600",
          )}
        />
      </div>

      {error && (
        <p
          id="tags-error"
          className="text-sm text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default TagInput;
