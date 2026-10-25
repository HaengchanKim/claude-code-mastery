"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

// 데스크톱(md 이상) 내비게이션: 현재 경로와 일치하는 메뉴를 강조합니다.
export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {siteConfig.mainNav.map((item) => {
        const isActive = item.href === pathname

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
