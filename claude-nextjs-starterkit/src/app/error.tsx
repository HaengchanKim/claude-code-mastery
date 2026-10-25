"use client"

import { useEffect } from "react"
import { RotateCcw, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"

// 라우트 세그먼트에서 발생한 런타임 에러를 잡는 에러 경계 (반드시 클라이언트 컴포넌트)
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 필요하면 여기서 Sentry 같은 에러 리포팅 서비스로 전송하세요.
    console.error(error)
  }, [error])

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <TriangleAlert className="size-12 text-destructive" />
      <h1 className="text-3xl font-bold tracking-tight">문제가 발생했습니다</h1>
      <p className="text-muted-foreground">
        일시적인 오류일 수 있습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <Button onClick={() => reset()}>
        <RotateCcw data-icon="inline-start" />
        다시 시도
      </Button>
    </section>
  )
}
