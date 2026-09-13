/**
 * data.js — 이 파일 하나만 고치면 사이트 전체가 바뀝니다.
 *
 * 아래 PROFILE 객체의 값만 본인 정보로 교체하세요.
 * HTML/JS는 건드릴 필요가 없습니다.
 */

const PROFILE = {
    // ===== 기본 정보 =====
    name: '김행찬',                       // 이름
    nameEn: 'Haengchan Kim',              // 영문 이름 (네비게이션 로고에 사용, 없으면 name 사용)
    role: '프론트엔드 개발자',              // 직업 / 역할
    tagline: '보이는 것 너머의 경험을 고민합니다',  // 히어로 한 줄 문구

    // ===== 소개 (배열 한 줄 = 문단 한 줄, 2~3줄 권장) =====
    about: [
        '안녕하세요. 사용자가 헤매지 않는 화면을 만드는 것에 관심이 많은 프론트엔드 개발자입니다.',
        '바닐라 자바스크립트로 기본기를 다지고, 최근에는 React와 디자인 시스템을 공부하고 있습니다.',
        '작은 프로젝트라도 끝까지 완성해 배포하는 것을 목표로 꾸준히 만들고 기록합니다.'
    ],

    // ===== 기술 스택 (level: 게이지 바 채움 비율 0~100) =====
    skills: [
        { name: 'HTML',        level: 90, icon: '🧩' },
        { name: 'CSS',         level: 85, icon: '🎨' },
        { name: 'JavaScript',  level: 80, icon: '⚡' },
        { name: 'Tailwind CSS', level: 75, icon: '💨' },
        { name: 'React',       level: 60, icon: '⚛️' },
        { name: 'Git / GitHub', level: 70, icon: '🔧' }
    ],

    // ===== 프로젝트 / 포트폴리오 =====
    // link가 빈 문자열('')이면 링크 버튼이 표시되지 않습니다.
    projects: [
        {
            title: '버킷 리스트 앱',
            description: '이루고 싶은 일을 기록하고 달성률을 확인하는 웹앱. localStorage로 데이터를 저장하고, 필터와 수정 모달을 직접 구현했습니다.',
            tags: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
            link: 'https://github.com/HaengchanKim',
            emoji: '🎯'
        },
        {
            title: '개인 프로필 사이트',
            description: '지금 보고 계신 이 페이지입니다. Tailwind CSS와 바닐라 JS만으로 만든 반응형 프로필 사이트로, 콘텐츠는 데이터 파일 하나로 관리합니다.',
            tags: ['Tailwind CSS', 'JavaScript', '반응형'],
            link: 'https://github.com/HaengchanKim',
            emoji: '🪪'
        },
        {
            title: '날씨 대시보드',
            description: '공개 API에서 받아온 날씨 데이터를 카드와 차트로 보여주는 대시보드. 비동기 처리와 에러 상태 UI를 연습한 프로젝트입니다.',
            tags: ['JavaScript', 'REST API', 'Chart'],
            link: '',
            emoji: '🌤️'
        }
    ],

    // ===== 연락처 (빈 문자열('')이면 해당 버튼이 표시되지 않습니다) =====
    contact: {
        message: '새로운 기회나 협업 제안은 언제든 환영합니다. 편하게 연락 주세요.',
        email: 'pred712@gmail.com',
        github: 'https://github.com/HaengchanKim',
        linkedin: '',
        blog: ''
    }
};
