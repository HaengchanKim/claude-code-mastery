import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"

import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/sonner"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import "./globals.css"

// globals.css의 @theme inline이 --font-sans / --font-geist-mono 변수를 참조합니다.
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes가 <html>에 class를 주입하므로 suppressHydrationWarning이 필요합니다.
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn(geistSans.variable, geistMono.variable, "h-full antialiased")}
    >
      {/* break-keep: 한글이 단어 중간에서 줄바꿈되지 않도록 합니다 */}
      <body className="flex min-h-full flex-col break-keep">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 text-center text-sm text-muted-foreground">
            {siteConfig.name} · Next.js + shadcn/ui 스타터킷
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
