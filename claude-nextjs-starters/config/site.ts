// 사이트 전역 설정: layout metadata, 헤더/모바일 내비게이션이 이 값을 공유합니다.
// mainNav의 해시 링크는 app/page.tsx 섹션의 id와 짝입니다.
export const siteConfig = {
  name: "Next Starter",
  description:
    "Next.js · TypeScript · Tailwind CSS · shadcn/ui · Lucide로 바로 시작하는 모던 웹 스타터킷",
  mainNav: [
    { title: "기술 스택", href: "/#stack" },
    { title: "시작하기", href: "/#getting-started" },
    { title: "폼 예제", href: "/#form" },
  ],
}
