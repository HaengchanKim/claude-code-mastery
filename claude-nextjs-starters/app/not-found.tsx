import type { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

// 없으면 layout 기본 제목이 그대로 쓰여 탭에서 404인지 구분되지 않습니다.
export const metadata: Metadata = { title: "페이지를 찾을 수 없음" }

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-32 text-center">
      <p className="text-6xl font-bold">404</p>
      <h1 className="text-xl font-semibold">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground">주소가 바뀌었거나 삭제된 페이지입니다.</p>
      <Link href="/" className={buttonVariants()}>
        홈으로
      </Link>
    </div>
  )
}
