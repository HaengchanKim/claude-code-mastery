import Link from "next/link"
import { Rocket } from "lucide-react"

import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { siteConfig } from "@/config/site"

// 상단 고정 헤더 (서버 컴포넌트). 높이(h-14)는 page.tsx 섹션의 scroll-mt-16과 짝입니다.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Rocket className="size-5" />
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
