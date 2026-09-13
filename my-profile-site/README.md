# 개인 프로필 사이트

HTML · Tailwind CSS(CDN) · 바닐라 JavaScript로 만든 1페이지 프로필/포트폴리오 사이트입니다.
빌드 도구도, 패키지 매니저도 필요 없습니다.

## 여는 방법

`index.html`을 브라우저로 그냥 열어도 되고, 정적 서버로 띄워도 됩니다.

```bash
python -m http.server 8000   # 이후 http://localhost:8000 접속
```

VS Code의 "Live Server" 확장도 동작합니다 (`index.html` 우클릭 → Open with Live Server).

## 내 정보로 바꾸기

**`js/data.js` 한 파일만 고치면 됩니다.** HTML은 건드릴 필요가 없습니다.

```js
const PROFILE = {
    name: '김행찬',                 // 이름
    nameEn: 'Haengchan Kim',       // 네비게이션 로고 + 아바타 이니셜
    role: '프론트엔드 개발자',       // 직업 / 역할
    tagline: '...',                // 히어로 한 줄 문구
    about: [ '...', '...' ],       // 소개 — 배열 한 줄 = 문단 한 줄
    skills: [ { name: 'HTML', level: 90, icon: '🧩' } ],   // level = 게이지 바 %
    projects: [ { title, description, tags, link, emoji } ],
    contact: { message, email, github, linkedin, blog }
};
```

- `projects` 배열에 항목을 넣고 빼면 카드 개수가 그대로 따라갑니다.
- `contact`의 값이나 `project.link`를 빈 문자열 `''`로 두면 해당 버튼이 표시되지 않습니다.
- `skills`의 `level`은 0~100 사이 숫자이며 게이지 바 채움 비율로 쓰입니다.

## 구조

```
my-profile-site/
├── index.html        # 마크업 (동적 영역은 빈 컨테이너 + id 만 존재)
├── css/styles.css    # 폰트, 스크롤 애니메이션, 게이지 바 등 Tailwind 보완용
└── js/
    ├── data.js       # ★ 모든 개인 정보 — 여기만 수정
    └── app.js        # 렌더링 + 다크모드 + 스크롤 애니메이션
```

- **다크모드**: 우상단 버튼으로 전환하며 `localStorage`에 저장됩니다. 첫 방문 시에는 OS 설정(`prefers-color-scheme`)을 따릅니다.
- **스크롤 애니메이션**: `IntersectionObserver`로 섹션이 화면에 들어올 때 페이드업됩니다. OS의 "모션 줄이기" 설정을 켜두면 애니메이션 없이 바로 표시됩니다.
- 사용자 텍스트는 모두 `escapeHtml()`을 거쳐 삽입합니다. 필드를 추가할 때도 동일하게 처리하세요.

## GitHub Pages 배포

저장소에 push한 뒤 Settings → Pages → Source를 `main` 브랜치 / `/my-profile-site` 경로로 지정하면 그대로 배포됩니다.
