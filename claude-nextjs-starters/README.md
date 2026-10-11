# Next Starter

바로 웹 개발을 시작할 수 있는 Next.js 스타터킷입니다.

## 기술 스택

| 영역 | 라이브러리 |
| --- | --- |
| 프레임워크 | Next.js 16 (App Router, Turbopack, Cache Components) + React 19 |
| 언어 | TypeScript (strict) |
| 스타일 | Tailwind CSS v4 (설정 파일 없음, `app/globals.css`의 CSS 변수로 테마 관리) |
| UI 컴포넌트 | shadcn/ui `base-nova` 스타일 (Base UI 기반) |
| 아이콘 | lucide-react |
| 테마 | next-themes (라이트 / 다크 / 시스템) |
| 토스트 | sonner |
| 폼 | react-hook-form + zod + @hookform/resolvers |

## 시작하기

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # ESLint
npm run build   # 프로덕션 빌드 (타입 검사 포함)
```

## 폴더 구조

```
app/
  layout.tsx          # 폰트, 메타데이터, ThemeProvider, 헤더/푸터, Toaster
  page.tsx            # 랜딩 페이지 (기술 스택, 시작하기, 폼 예제)
  not-found.tsx       # 404 페이지
  globals.css         # Tailwind + 색상/반경 토큰 (:root / .dark)
components/
  site-header.tsx     # 상단 헤더 (서버 컴포넌트)
  mobile-nav.tsx      # 모바일 메뉴 (Sheet)
  mode-toggle.tsx     # 테마 선택 (DropdownMenu + next-themes)
  contact-form.tsx    # 폼 예제 (react-hook-form + zod + sonner)
  ui/                 # shadcn/ui 컴포넌트 (CLI로 추가)
config/site.ts        # 사이트 이름, 설명, 메뉴
lib/utils.ts          # cn() 유틸
```

## 자주 하는 작업

- **사이트 이름·메뉴 변경**: `config/site.ts`만 수정하면 메타데이터와 헤더/모바일 메뉴에 함께 반영됩니다.
- **shadcn 컴포넌트 추가**: `npx shadcn add dialog` → `components/ui/dialog.tsx` 생성. 목록은 [ui.shadcn.com](https://ui.shadcn.com/docs/components)에서 확인하세요.
- **색상 변경**: `app/globals.css`의 `:root`(라이트) / `.dark`(다크) CSS 변수를 수정합니다.
- **토스트 띄우기**: 클라이언트 컴포넌트에서 `import { toast } from "sonner"` 후 `toast.success("...")`.
- **새 폼 만들기**: `components/contact-form.tsx`의 zod 스키마 + `Controller` + `Field` 패턴을 복사해 시작하세요.

## Base UI 사용 시 주의

shadcn `base-nova` 스타일은 Radix가 아닌 Base UI 기반이라 `asChild` 대신 `render` prop을 씁니다.

```tsx
// 버튼 모양의 링크
<Button nativeButton={false} render={<Link href="/about" />}>소개</Button>
```

`<button>`이 아닌 요소를 렌더링할 때는 `nativeButton={false}`가 필요합니다.
