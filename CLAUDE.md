# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 저장소 성격

Claude Code 학습용 워크스페이스입니다. 루트는 컨테이너일 뿐이고, 실제 코드는 서로 독립적인 하위 프로젝트 디렉터리에 들어 있습니다. 공유 코드·공용 의존성·모노레포 도구는 없으니 한 프로젝트를 고칠 때 다른 프로젝트를 함께 고칠 이유는 없습니다.

- `bucket-list-main/` — LocalStorage 기반 버킷리스트 CRUD 앱. **자체 `CLAUDE.md`가 있으므로 이 디렉터리에서 작업할 때는 그 파일을 먼저 읽을 것.**
- `my-profile-site/` — 1페이지 프로필/포트폴리오 사이트.
- `claude-nextjs-starterkit/` — Next.js 15 + TypeScript + Tailwind CSS v4 + shadcn/ui 스타터킷. **npm 기반 프로젝트로, 아래 "실행"·"공통 아키텍처 패턴" 섹션은 적용되지 않습니다. 이 디렉터리에서 작업할 때는 자체 `CLAUDE.md`를 먼저 읽을 것.**
- `claude-nextjs-starters/` — Next.js 16 + shadcn/ui(Base UI) 최신 버전 스타터킷 (next-themes, sonner, react-hook-form + zod 포함). `claude-nextjs-starterkit/`과 별개 프로젝트입니다. **npm 기반이며 "실행"·"공통 아키텍처 패턴" 섹션은 적용되지 않습니다. 자체 `CLAUDE.md`를 먼저 읽을 것.**

## 실행 (정적 사이트 두 프로젝트 공통: `bucket-list-main`, `my-profile-site`)

빌드 도구·패키지 매니저·테스트·린트가 전혀 없습니다 (`package.json` 없음). `index.html`을 브라우저로 직접 열거나 정적 서버로 띄우면 끝입니다.

```bash
cd my-profile-site   # 또는 bucket-list-main
python -m http.server 8000   # http://localhost:8000
```

VS Code "Live Server" 확장도 동작합니다. 변경 확인은 브라우저 새로고침이 유일한 검증 수단이므로, 로직을 바꿨으면 실제로 열어 확인하세요.

## 공통 아키텍처 패턴 (정적 사이트 두 프로젝트)

`bucket-list-main`과 `my-profile-site`는 같은 형태를 따릅니다. 새 기능도 이 틀 안에서 확장하고, React/Vue/번들러/npm 의존성을 끌어들이지 마세요.

- **데이터 레이어와 UI 레이어를 파일 단위로 분리** — `index.html`에서 데이터 파일을 먼저, UI 파일을 나중에 `<script>`로 로드하며 전역 심볼로 연결합니다. 모듈 시스템(`import`/`export`)을 쓰지 않으므로 **script 태그 순서가 곧 의존성 선언**입니다.
  - `bucket-list-main`: `js/storage.js`(전역 `BucketStorage`, `localStorage` 키 `bucketList`) → `js/app.js`(`BucketListApp`)
  - `my-profile-site`: `js/data.js`(전역 `PROFILE` 상수) → `js/app.js`(`ProfileApp`)
- **`app` 전역 인스턴스 + `DOMContentLoaded`에서 `init()`** — `init()`은 `cacheElements()`로 `getElementById` 결과를 `this.el`에 캐시한 뒤 렌더/이벤트 바인딩을 수행합니다. 따라서 `index.html`의 id를 바꾸거나 지우면 반드시 해당 `cacheElements()`의 id 목록도 같이 고쳐야 합니다.
- **부분 갱신 없음** — 상태가 바뀌면 해당 섹션의 `innerHTML`을 통째로 다시 만듭니다. 템플릿 문자열로 HTML을 조립하므로, 사용자·데이터에서 온 **모든 문자열은 삽입 전 `escapeHtml()`을 통과**시켜야 합니다. 새 필드를 추가할 때도 예외 없이 적용하세요. `my-profile-site`는 URL에 대해 추가로 `safeUrl()`(http(s)/mailto/앵커/상대경로만 허용)을 거칩니다.
- **스타일링은 Tailwind CDN + 얇은 `css/styles.css`** — 빌드가 없으므로 Tailwind 설정은 `index.html` 인라인 `tailwind.config`에서만 가능합니다. `css/styles.css`에는 Tailwind로 표현하기 어려운 것(애니메이션, 게이지 바, `.nav-link`/`.section-title` 같은 반복 클래스)만 둡니다.
- **다크모드** (`my-profile-site`) — `<html>`의 `dark` 클래스로 제어하고 `localStorage.theme`에 저장합니다. 최초 적용은 FOUC 방지를 위해 `index.html` `<head>`의 인라인 스크립트가 담당하며, 토글만 `app.js`에 있습니다. 이 분담을 합치지 마세요.

## 콘텐츠 수정 위치

`my-profile-site`의 이름·소개·스킬·프로젝트·연락처는 전부 `js/data.js`의 `PROFILE` 객체에 있습니다. 내용 변경 요청은 HTML이 아니라 이 파일만 고치면 됩니다. 값이 빈 문자열이면 해당 버튼/카드가 렌더링되지 않는 것이 의도된 동작입니다.

## 커뮤니케이션

- 코드 주석, README, 커밋 메시지는 한국어로 작성합니다.
- 코드 변경 시 변경 이유를 간단히 설명
- 에러 발생 시 원인과 해결 방법을 함께 제시
