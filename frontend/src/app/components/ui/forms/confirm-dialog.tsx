"use client";

import { cn } from "@/lib/utils/general/cn";
import { X } from "lucide-react";
import { useEffect } from "react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        "flex items-center justify-center",
        "bg-black/60 px-4",
      )}
      onMouseDown={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className={cn(
          "w-full max-w-md rounded-lg",
          "border border-zinc-800 bg-zinc-950",
          "p-6 shadow-xl",
        )}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="confirm-dialog-title"
              className="text-lg font-semibold text-zinc-100"
            >
              {title}
            </h2>

            <p
              id="confirm-dialog-description"
              className="mt-2 text-sm leading-6 text-zinc-400"
            >
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close dialog"
            className={cn(
              "rounded-md p-1 text-zinc-500",
              "transition-colors",
              "hover:bg-zinc-800 hover:text-zinc-200",
            )}
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={cn(
              "rounded-md border border-zinc-700",
              "px-4 py-2 text-sm font-medium text-zinc-300",
              "transition-colors",
              "hover:bg-zinc-800 hover:text-zinc-100",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "rounded-md bg-red-500",
              "px-4 py-2 text-sm font-medium text-white",
              "transition-colors",
              "hover:bg-red-400",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog