# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Next.js 15 App Router + TypeScript + Tailwind CSS v4 + shadcn/ui(Radix) + lucide-react 스타터킷입니다.
상위 디렉터리(`claude-code-mastery/`)가 git 루트이며, 형제 프로젝트들(정적 HTML 사이트)과 코드·의존성을 공유하지 않습니다.

## 명령

```bash
npm run dev          # 개발 서버 (Turbopack, http://localhost:3000)
npm run lint         # ESLint 9 flat config (eslint.config.mjs)
npm run typecheck    # tsc --noEmit
npm run format       # Prettier 적용 (검사만: npm run format:check)
npm run build        # 프로덕션 빌드 (webpack)
```

- **테스트 프레임워크는 없습니다.** 검증은 `lint` → `typecheck` → `format:check` → `build` 순서이고, UI 변경은 dev 서버를 브라우저로 열어 라이트/다크·모바일 폭까지 확인합니다.
- `build`에 `--turbopack`을 붙이지 않은 것은 의도적입니다: Next 15 문서상 Turbopack build는 beta이고, 이 PC의 사내 SSL 검사 프록시(Zscaler) 환경에서는 Turbopack이 `NODE_EXTRA_CA_CERTS`를 따르지 않아 Google Fonts(Geist) 다운로드에 실패해 빌드가 깨집니다. 같은 이유로 dev 서버에서는 "Failed to download `Geist`" 경고와 함께 대체 폰트가 보일 수 있으며, 코드 문제가 아닙니다.

## 아키텍처

### 레이아웃 조립 (`src/app/layout.tsx`)

`<html>`(폰트 변수 클래스, `suppressHydrationWarning`) → `ThemeProvider`(next-themes, `attribute="class"`) → `TooltipProvider`(shadcn Tooltip 사용에 필수) → `SiteHeader` / `<main>` / `SiteFooter`.
헤더·푸터는 서버 컴포넌트이고, 상호작용이 필요한 조각(`main-nav`, `mobile-nav`, `mode-toggle`, `theme-provider`)만 `"use client"`입니다. 새 클라이언트 로직도 이렇게 가장 작은 단위로 분리합니다.

### 설정 단일 소스 (`src/config/site.ts`)

`siteConfig`를 metadata(layout), 데스크톱/모바일 내비게이션, 푸터가 모두 읽습니다. 메뉴·링크·사이트명 변경은 이 파일만 고칩니다. `mainNav`의 `/#features` 같은 해시 링크는 `page.tsx` 섹션의 `id`와 짝이며, 섹션에 붙은 `scroll-mt-16`은 sticky 헤더 높이(`h-14`)를 보정하는 값입니다.

### 파일 간 암묵적 연결 (수정 시 함께 바꿔야 하는 것)

- **폰트**: `layout.tsx`의 `Geist({ variable: "--font-sans" })`, `Geist_Mono({ variable: "--font-geist-mono" })` 변수명은 `globals.css`의 `@theme inline`이 참조합니다. 폰트 클래스는 `<body>`가 아닌 `<html>`에 있어야 `html { @apply font-sans }`가 적용됩니다.
- **`cn` 유틸**: shadcn(v4 CLI)이 설치한 `cn` npm 패키지(shadcn-ui 공식)입니다. `src/components/ui/*`는 `"cn"`을 직접 import하고, 앱 코드는 이를 재수출하는 `@/lib/utils`를 씁니다. clsx/tailwind-merge를 따로 추가하지 마세요.
- **`shadcn` 런타임 의존성**: `globals.css`가 `@import "shadcn/tailwind.css"`를 쓰므로 `shadcn` 패키지는 `dependencies`에서 제거하면 안 됩니다.
- **버튼 속 아이콘 간격**: radix-nova 스타일 Button/Badge는 아이콘에 `data-icon="inline-start" | "inline-end"`를 달면 패딩을 자동 보정합니다. 아이콘 크기는 `[&_svg]` 기본값(size-4)에 맡깁니다.
- **기술스택 버전 표시**: `page.tsx`가 `package.json`을 import해 버전을 렌더링하므로, 표시할 패키지를 바꾸면 `stack` 배열도 함께 수정합니다.
- **한글 줄바꿈**: `<body>`의 `break-keep`(word-break: keep-all)으로 단어 중간 줄바꿈을 막습니다.

## 규칙

- **버전 고정**: Next.js는 15.x를 유지합니다. `npx create-next-app@latest`, `npx shadcn@latest init -t next`는 Next 16을 설치하므로 쓰지 않습니다. `next`와 `eslint-config-next`는 같은 15.x 버전으로 함께 올립니다. (`npm audit`의 Next 내부 postcss 경고는 Next 16 업그레이드로만 해결되므로 `audit fix --force`를 실행하지 마세요.)
- **Tailwind v4**: `tailwind.config.*`를 만들지 않습니다. 색상은 `globals.css`의 `:root`/`.dark` CSS 변수(OKLCH), 새 토큰은 `@theme inline`에 추가합니다. PostCSS는 `postcss.config.mjs`의 `@tailwindcss/postcss` 하나뿐입니다.
- **shadcn/ui**: `src/components/ui/`는 `npx shadcn@latest add <name>`으로 추가·갱신하는 CLI 관리 영역이라 `.prettierignore`로 포맷에서 제외했습니다(파일 자체는 수정 가능). 비대화형 실행 시 프롬프트가 뜨면 `-y`를 붙이고, init은 `-b radix -p nova`가 현재 구성입니다(`components.json`의 `style: radix-nova`).
- **다크 모드**: `<html suppressHydrationWarning>`을 제거하지 않습니다. 테마별 아이콘·스타일은 `useTheme()` 분기 대신 `dark:` 변형으로 처리해 하이드레이션 불일치를 피합니다.
- **아이콘**: `lucide-react` named import만 사용합니다. lucide v1에는 브랜드 아이콘(GitHub 등)이 없으므로 `src/components/icons.tsx`에 SVG로 추가합니다.
- **코드 스타일**: Prettier(`semi: false`, 쌍따옴표, trailing comma) + `prettier-plugin-tailwindcss`가 `cn()`/`cva()` 안의 클래스까지 정렬합니다. 주석·문서는 한국어로 작성합니다.
- 경로 alias: `@/*` → `src/*`.
