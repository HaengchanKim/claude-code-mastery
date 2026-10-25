import Link from "next/link"
import { House, SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"

// 존재하지 않는 경로 또는 notFound() 호출 시 표시되는 404 페이지
export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <SearchX className="size-12 text-muted-foreground" />
      <h1 className="text-3xl font-bold tracking-tight">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-muted-foreground">
        요청하신 주소가 변경되었거나 삭제되었을 수 있습니다.
      </p>
      <Button asChild>
        <Link href="/">
          <House data-icon="inline-start" />
          홈으로 돌아가기
        </Link>
      </Button>
    </section>
  )
}
