import { Skeleton } from "@/components/ui/skeleton"

// 페이지 전환·데이터 로딩 중 Suspense fallback으로 표시되는 스켈레톤 UI
export default function Loading() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20">
      <Skeleton className="h-5 w-48 rounded-full" />
      <Skeleton className="h-12 w-full max-w-2xl" />
      <Skeleton className="h-6 w-full max-w-xl" />
      <div className="grid w-full gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-xl" />
        ))}
      </div>
    </section>
  )
}
