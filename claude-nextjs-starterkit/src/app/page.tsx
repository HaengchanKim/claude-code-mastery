import Link from "next/link"
import {
  ArrowRight,
  Component,
  Moon,
  Palette,
  ShieldCheck,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { GitHubIcon } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"
import packageJson from "../../package.json"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Next.js 15 App Router",
    description:
      "서버 컴포넌트, 중첩 레이아웃, 파일 기반 라우팅과 Turbopack 개발 서버가 기본 구성되어 있습니다.",
  },
  {
    icon: Palette,
    title: "Tailwind CSS v4",
    description:
      "tailwind.config 없이 globals.css의 @theme으로 디자인 토큰을 관리하는 CSS-first 설정입니다.",
  },
  {
    icon: Component,
    title: "shadcn/ui",
    description:
      "Radix UI 기반의 접근성 높은 컴포넌트를 소스째 가져와 자유롭게 수정할 수 있습니다.",
  },
  {
    icon: Moon,
    title: "다크 모드",
    description:
      "next-themes로 라이트·다크·시스템 테마를 지원하며 새로고침 시 깜빡임이 없습니다.",
  },
  {
    icon: ShieldCheck,
    title: "TypeScript strict",
    description:
      "strict 모드와 ESLint, Prettier가 설정되어 있어 일관된 코드 품질을 유지합니다.",
  },
  {
    icon: Smartphone,
    title: "반응형 레이아웃",
    description:
      "고정 헤더, 모바일 Sheet 메뉴, 푸터로 구성된 레이아웃이 모든 화면 크기에 대응합니다.",
  },
]

// 기술스택 버전은 package.json에서 읽어 오므로 업그레이드 시 자동으로 반영됩니다.
const versions: Record<string, string> = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
}

const stack = [
  { name: "Next.js", pkg: "next" },
  { name: "React", pkg: "react" },
  { name: "TypeScript", pkg: "typescript" },
  { name: "Tailwind CSS", pkg: "tailwindcss" },
  { name: "Radix UI", pkg: "radix-ui" },
  { name: "lucide-react", pkg: "lucide-react" },
  { name: "next-themes", pkg: "next-themes" },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center md:py-28">
        <Badge variant="secondary">
          Next.js 15 · Tailwind CSS v4 · shadcn/ui
        </Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-6xl">
          아이디어를 바로 코드로 옮기는 웹 스타터킷
        </h1>
        <p className="max-w-2xl text-lg text-balance text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="#features">
              기능 살펴보기
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <GitHubIcon data-icon="inline-start" />
              GitHub
            </a>
          </Button>
        </div>
      </section>

      <Separator />

      {/* 기능 소개 */}
      <section
        id="features"
        className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-16 md:py-24"
      >
        <div className="mb-10 flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">포함된 기능</h2>
          <p className="text-muted-foreground">
            설정에 시간을 쓰지 말고 바로 기능 개발을 시작하세요.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* 기술스택 */}
      <section
        id="stack"
        className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-16 md:py-24"
      >
        <div className="mb-10 flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">기술스택</h2>
          <p className="text-muted-foreground">
            package.json에 설치된 버전 기준입니다.
          </p>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {stack.map(({ name, pkg }) => (
            <li key={pkg}>
              <Badge variant="outline" className="h-8 gap-2 px-3 text-sm">
                {name}
                <span className="font-mono text-xs text-muted-foreground">
                  {versions[pkg] ?? "-"}
                </span>
              </Badge>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
