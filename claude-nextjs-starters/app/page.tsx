import Link from "next/link"
import {
  ArrowRight,
  Bell,
  BookOpen,
  ClipboardCheck,
  Component,
  FileCode,
  Paintbrush,
  Rocket,
  Shapes,
  SunMoon,
} from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import pkg from "@/package.json"

// 버전은 package.json에서 읽습니다. 패키지를 바꾸면 아래 stack의 dep 값도 함께 수정하세요.
const versions: Record<string, string> = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
}

const stack = [
  { name: "Next.js", dep: "next", icon: Rocket, description: "App Router · Turbopack · Cache Components" },
  { name: "TypeScript", dep: "typescript", icon: FileCode, description: "strict 모드, @/* 경로 alias" },
  { name: "Tailwind CSS", dep: "tailwindcss", icon: Paintbrush, description: "v4, CSS 변수(OKLCH) 기반 테마" },
  { name: "shadcn/ui", dep: "shadcn", icon: Component, description: "Base UI 기반 컴포넌트 (base-nova)" },
  { name: "Lucide", dep: "lucide-react", icon: Shapes, description: "아이콘 라이브러리" },
  { name: "next-themes", dep: "next-themes", icon: SunMoon, description: "라이트 · 다크 · 시스템 테마" },
  { name: "Sonner", dep: "sonner", icon: Bell, description: "토스트 알림" },
  { name: "React Hook Form + Zod", dep: "react-hook-form", icon: ClipboardCheck, description: "폼 상태 관리와 스키마 검증" },
]

// sticky 헤더(h-14)에 섹션 제목이 가려지지 않도록 scroll-mt-16을 붙입니다.
const sectionClass = "mx-auto max-w-5xl scroll-mt-16 px-4 py-16"

export default function Home() {
  return (
    <>
      <section className="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center md:py-28">
        <Badge variant="secondary">Next.js {versions.next}</Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          바로 시작하는 모던 웹 스타터킷
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {/* 링크는 Button(render prop)으로 감싸면 role="button"이 붙으므로 buttonVariants로 스타일만 입힙니다 */}
          <Link href="#getting-started" className={buttonVariants({ size: "lg" })}>
            시작하기
            <ArrowRight data-icon="inline-end" />
          </Link>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <BookOpen data-icon="inline-start" />
            Next.js 문서
          </a>
        </div>
      </section>

      <section id="stack" className={sectionClass}>
        <h2 className="text-2xl font-bold tracking-tight">기술 스택</h2>
        <p className="mt-2 text-muted-foreground">설정 없이 바로 쓸 수 있도록 구성되어 있습니다.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map(({ name, dep, icon: Icon, description }) => (
            <Card key={name}>
              <CardHeader>
                <Icon className="size-5 text-muted-foreground" />
                <CardAction>
                  <Badge variant="outline">v{versions[dep].replace("^", "")}</Badge>
                </CardAction>
                <CardTitle className="mt-2">{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="getting-started" className={sectionClass}>
        <h2 className="text-2xl font-bold tracking-tight">시작하기</h2>
        <pre className="mt-6 overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm">
          <code>{`npm install
npm run dev                 # http://localhost:3000
npx shadcn add dialog       # 컴포넌트 추가 → components/ui/`}</code>
        </pre>
        <ul className="mt-6 list-disc space-y-1 pl-5 text-muted-foreground">
          <li>
            사이트 이름·메뉴: <code className="font-mono text-foreground">config/site.ts</code>
          </li>
          <li>
            색상·반경 토큰: <code className="font-mono text-foreground">app/globals.css</code>
          </li>
          <li>
            이 페이지: <code className="font-mono text-foreground">app/page.tsx</code>
          </li>
        </ul>
      </section>

      <section id="form" className={sectionClass}>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">폼 예제</h2>
            <p className="mt-2 text-muted-foreground">
              React Hook Form이 상태를, Zod 스키마가 검증을 맡고, 제출 결과는 Sonner 토스트로
              보여줍니다. 코드는 <code className="font-mono text-foreground">components/contact-form.tsx</code>
              에 있습니다.
            </p>
          </div>
          <Card>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
