import Link from "next/link"
import { Rocket } from "lucide-react"

import { GitHubIcon } from "@/components/icons"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { siteConfig } from "@/config/site"

// 상단 고정 헤더 (서버 컴포넌트). 상호작용이 필요한 부분만 클라이언트 컴포넌트로 분리했습니다.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-4 md:gap-6">
        <MobileNav />
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Rocket className="size-5" />
          <span>{siteConfig.name}</span>
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>GitHub 저장소</TooltipContent>
          </Tooltip>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
