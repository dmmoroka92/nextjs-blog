import { cn } from "@/lib/utils/general/cn";

type EditorButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

function EditorButton({
  children,
  active = false,
  disabled = false,
  onClick,
}: EditorButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-9 items-center justify-center rounded",
        "text-zinc-400 transition-colors",
        "hover:bg-zinc-800 hover:text-zinc-100",
        "disabled:pointer-events-none disabled:opacity-30",
        active && "bg-zinc-800 text-emerald-300",
      )}
    >
      {children}
    </button>
  );
}

export default EditorButton