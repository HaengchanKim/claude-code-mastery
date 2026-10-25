"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// next-themes 래퍼 (shadcn/ui 다크 모드 공식 가이드와 동일)
// 서버 컴포넌트인 layout.tsx에서 사용할 수 있도록 클라이언트 경계를 이 파일로 분리합니다.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
