export default function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/6 bg-white/3">
      <div className="h-44 animate-pulse bg-white/5" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-20 animate-pulse rounded-full bg-white/8" />
        <div className="h-4 w-full animate-pulse rounded-full bg-white/8" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/8" />
        <div className="mt-2 h-7 w-28 animate-pulse rounded-full bg-white/8" />
        <div className="mt-auto h-10 animate-pulse rounded-xl bg-white/5" />
      </div>
    </div>
  )
}
