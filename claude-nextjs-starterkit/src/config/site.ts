// 사이트 전역 설정
// 메타데이터(layout.tsx), 헤더/모바일 내비게이션, 푸터가 모두 이 값을 참조합니다.
// 사이트 이름·링크·메뉴를 바꿀 때는 이 파일만 수정하면 됩니다.

export type NavItem = {
  title: string
  href: string
}

export const siteConfig = {
  name: "Next Starter",
  description:
    "Next.js 15 · TypeScript · Tailwind CSS v4 · shadcn/ui 기반으로 바로 시작하는 웹 개발 스타터킷",
  // 배포 시 NEXT_PUBLIC_SITE_URL 환경변수로 실제 도메인을 지정하세요.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  mainNav: [
    { title: "홈", href: "/" },
    { title: "기능", href: "/#features" },
    { title: "기술스택", href: "/#stack" },
  ] satisfies NavItem[],
  links: {
    github: "https://github.com/",
  },
}
