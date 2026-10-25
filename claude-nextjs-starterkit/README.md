# Next Starter

Next.js 15 App Router 기반으로 웹 개발을 바로 시작할 수 있는 스타터킷입니다.
레이아웃, 다크 모드, 자주 쓰는 UI 컴포넌트, 에러/404/로딩 페이지, 코드 품질 도구가 미리 구성되어 있습니다.

## 기술스택

| 분류       | 사용 기술                                                                               |
| ---------- | --------------------------------------------------------------------------------------- |
| 프레임워크 | [Next.js 15](https://nextjs.org/docs/15) (App Router, Turbopack dev)                    |
| 언어       | TypeScript (strict)                                                                     |
| 스타일링   | [Tailwind CSS v4](https://tailwindcss.com/docs) — `tailwind.config` 없이 CSS-first 설정 |
| UI         | [shadcn/ui](https://ui.shadcn.com/docs) (Radix UI 기반, `radix-nova` 스타일)            |
| 아이콘     | [lucide-react](https://lucide.dev/guide/react/getting-started)                          |
| 테마       | [next-themes](https://github.com/pacocoursey/next-themes) (라이트/다크/시스템)          |
| 코드 품질  | ESLint 9 (flat config), Prettier + `prettier-plugin-tailwindcss`                        |

## 시작하기

Node.js **20.18.1 이상**이 필요합니다 (shadcn CLI 요구사항, Next.js 자체는 18.18 이상).

```bash
npm install
npm run dev        # http://localhost:3000
```

## 스크립트

| 명령                   | 설명                                  |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Turbopack 개발 서버 실행              |
| `npm run build`        | 프로덕션 빌드                         |
| `npm run start`        | 프로덕션 서버 실행 (build 후)         |
| `npm run lint`         | ESLint 검사                           |
| `npm run typecheck`    | TypeScript 타입 검사 (`tsc --noEmit`) |
| `npm run format`       | Prettier로 전체 포맷 적용             |
| `npm run format:check` | 포맷 검사만 수행 (CI용)               |

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃: 폰트, 메타데이터, ThemeProvider, 헤더/푸터
│   ├── page.tsx            # 랜딩 페이지 예시
│   ├── loading.tsx         # 로딩 UI (Skeleton)
│   ├── error.tsx           # 에러 경계
│   ├── not-found.tsx       # 404 페이지
│   └── globals.css         # Tailwind 진입점 + 테마 토큰(CSS 변수)
├── components/
│   ├── layout/             # site-header, main-nav, mobile-nav, site-footer
│   ├── providers/          # theme-provider (next-themes 래퍼)
│   ├── ui/                 # shadcn/ui 컴포넌트 (CLI로 관리)
│   ├── icons.tsx           # 브랜드 아이콘 (GitHub 등)
│   └── mode-toggle.tsx     # 테마 전환 버튼
├── config/
│   └── site.ts             # 사이트 이름·설명·메뉴·링크
└── lib/
    └── utils.ts            # cn() 유틸리티
```

## 커스터마이징

### 사이트 정보·메뉴 변경

`src/config/site.ts`의 `siteConfig`만 수정하면 메타데이터, 헤더, 모바일 메뉴, 푸터에 모두 반영됩니다.
배포 도메인은 `NEXT_PUBLIC_SITE_URL` 환경변수로 지정하세요 (`.env.local`).

### 테마 색상 변경

Tailwind v4는 설정 파일 대신 CSS에서 테마를 정의합니다.
`src/app/globals.css`의 `:root`(라이트)와 `.dark`(다크) 블록의 CSS 변수(OKLCH)를 수정하세요.
새 디자인 토큰은 `@theme inline { ... }`에 추가하면 유틸리티 클래스로 바로 사용할 수 있습니다.
[shadcn/ui Themes](https://ui.shadcn.com/themes)에서 만든 테마를 붙여넣어도 됩니다.

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add dialog form table
```

컴포넌트는 `src/components/ui/`에 소스 파일로 추가되며, 자유롭게 수정할 수 있습니다.
이미 포함된 컴포넌트: `avatar` `badge` `button` `card` `dropdown-menu` `input` `label` `separator` `sheet` `skeleton` `tooltip`

### 아이콘 사용

```tsx
import { Camera } from "lucide-react"

export function PhotoButton() {
  return <Camera className="size-4" />
}
```

lucide-react v1부터 브랜드 아이콘(GitHub 등)이 빠졌으므로 필요하면 `src/components/icons.tsx`에 SVG로 추가합니다.

## 참고 사항

- **`npm run build`는 webpack 빌드를 사용합니다.** Next.js 15 문서 기준으로 Turbopack 프로덕션 빌드는 beta이기 때문입니다. 개발 서버(`dev`)는 안정화된 Turbopack을 사용합니다.
- **사내망(SSL 검사 프록시) 환경**에서는 Turbopack이 Google Fonts(Geist)를 내려받지 못해 대체 폰트로 표시될 수 있습니다 (경고만 표시되고 동작에는 문제 없음). `npm run build`(webpack)는 `NODE_EXTRA_CA_CERTS` 설정을 따르므로 정상 동작합니다.

## 참고 문서

- [Next.js 15 설치 가이드](https://nextjs.org/docs/15/app/getting-started/installation)
- [Tailwind CSS — Next.js 설치 가이드](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [shadcn/ui — Next.js 설치](https://ui.shadcn.com/docs/installation/next) · [다크 모드](https://ui.shadcn.com/docs/dark-mode/next) · [Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4)
- [lucide-react](https://lucide.dev/guide/react/getting-started)
