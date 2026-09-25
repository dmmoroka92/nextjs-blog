import { cn } from "@/lib/utils/general/cn"

export type PostStat = {
  label: string
  value: number
}

type PostStatsProps = {
  stats: PostStat[];
}

function PostStats({ stats }: PostStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "rounded-md border border-zinc-800",
            "bg-zinc-950/30 px-4 py-5",
          )}
        >
          <p
            className={cn(
              "text-2xl font-semibold",
              stat.label === "Drafts"
                ? "text-zinc-100"
                : "text-emerald-300",
            )}
          >
            {stat.value}
          </p>

          <p className="mt-2 text-sm text-zinc-400">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

export default PostStats
