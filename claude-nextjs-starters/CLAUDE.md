@AGENTS.md

# CLAUDE.md

Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui(base-nova, Base UI) + lucide-react 스타터킷입니다.
next-themes, sonner, react-hook-form + zod가 포함되어 있습니다. 상위 git 루트의 형제 프로젝트(`claude-nextjs-starterkit/` 등)와 코드·의존성을 공유하지 않습니다.

## 명령

```bash
npm run dev     # 개발 서버 (Turbopack)
npm run lint    # ESLint 9 flat config
npm run build   # 프로덕션 빌드 (Turbopack, 타입 검사 포함)
npx tsc --noEmit
```

테스트 프레임워크는 없습니다. 검증은 `lint` → `tsc` → `build`, UI 변경은 dev 서버를 브라우저로 열어 라이트/다크·모바일 폭까지 확인합니다.

## 원칙

- **직접 구현하지 말고 검증된 라이브러리를 사용합니다.** 테마는 next-themes, 토스트는 sonner, 폼은 react-hook-form + zod, UI는 `npx shadcn add <name>`으로 추가한 컴포넌트.
- `components/ui/`는 shadcn CLI 관리 영역입니다. 새 컴포넌트는 직접 작성하지 말고 CLI로 추가합니다.

## 파일 간 암묵적 연결 (수정 시 함께 바꿔야 하는 것)

- **폰트**: `layout.tsx`의 `Geist({ variable: "--font-sans" })` / `Geist_Mono({ variable: "--font-geist-mono" })`를 `globals.css`의 `@theme inline`이 참조합니다. 폰트 변수 클래스는 `<html>`에 있어야 합니다.
- **`cn` 유틸**: shadcn CLI가 설치한 `cn` npm 패키지(clsx + tailwind-merge 대체)입니다. clsx/tailwind-merge를 따로 추가하지 마세요.
- **`shadcn` 패키지**: `globals.css`가 `@import "shadcn/tailwind.css"`를 쓰므로 dependencies에서 제거하면 안 됩니다.
- **Tailwind 처리**: PostCSS가 아니라 `next.config.ts`의 `turbopack.rules`(`@tailwindcss/turbopack` 로더)가 CSS를 처리합니다. `postcss.config.*`나 `tailwind.config.*`를 만들지 말고, `--webpack` 빌드는 Tailwind가 적용되지 않으므로 쓰지 않습니다.
- **Cache Components**: `cacheComponents: true`라서 서버 컴포넌트에서 `new Date()`/`Math.random()` 등을 그냥 쓰면 에러입니다. `"use cache"` 또는 `await io()`가 필요합니다 (`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/io.md`).
- **`config/site.ts`**: metadata, 헤더 nav, 모바일 메뉴가 공유합니다. `mainNav`의 `/#stack` 같은 해시 링크는 `page.tsx` 섹션 `id`와 짝이고, 섹션의 `scroll-mt-16`은 sticky 헤더 높이(`h-14`) 보정입니다.
- **기술 스택 버전 표시**: `page.tsx`가 `package.json`을 import해 버전을 렌더링합니다. 패키지를 바꾸면 `stack` 배열의 `dep`도 수정합니다.

## Base UI 규칙

- `asChild`가 없습니다. 다른 요소로 렌더링할 땐 `render` prop을 쓰고, `<button>`이 아닌 요소면 `nativeButton={false}` 필수.
- **링크는 Button/SheetClose의 `render`로 감싸지 않습니다** (`<a>`에 `role="button"`이 붙음 — Base UI 문서상 금지). 버튼 모양 링크는 `<Link className={buttonVariants({ size: "lg" })}>`, 시트 안 링크는 `open` 상태를 제어하고 `onClick`에서 닫습니다 (`components/mobile-nav.tsx`).
- `DropdownMenuRadioItem`/`CheckboxItem`은 기본적으로 선택해도 메뉴가 닫히지 않습니다. 닫혀야 하면 `closeOnClick`을 지정합니다.
- 트리거에 버튼 스타일을 입힐 때: `<SheetTrigger render={<Button variant="ghost" size="icon" />}>`.
- 버튼 속 아이콘은 `data-icon="inline-start" | "inline-end"`로 패딩을 보정합니다.

## 다크 모드

- `<html suppressHydrationWarning>`을 제거하지 않습니다 (next-themes가 class를 주입).
- 테마별 아이콘·스타일은 `useTheme()` 분기 대신 `dark:` 변형으로 처리해 하이드레이션 불일치를 피합니다.
- `components/ui/sonner.tsx`도 next-themes의 `useTheme()`로 토스트 테마를 맞추므로 `ThemeProvider` 안에 있어야 합니다.

## 기타

- 한글 줄바꿈: `<body>`의 `break-keep`.
- lucide v1에는 브랜드 아이콘(GitHub 등)이 없습니다. 필요하면 SVG 컴포넌트로 추가합니다.
- 경로 alias: `@/*` → 프로젝트 루트 (`src/` 없음).
- 주석·문서·커밋 메시지는 한국어로 작성합니다.
