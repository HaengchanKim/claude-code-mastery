/**
 * app.js — UI 레이어
 *
 * js/data.js 의 전역 PROFILE 객체를 읽어 화면을 그립니다.
 * 내용을 바꾸려면 이 파일이 아니라 js/data.js 를 수정하세요.
 */

class ProfileApp {
    constructor() {
        this.el = {};
    }

    init() {
        this.cacheElements();
        this.renderAll();
        this.bindEvents();
        this.initReveal();
        this.initSmoothScroll();
    }

    /* ===================== 초기화 ===================== */

    cacheElements() {
        const ids = [
            'siteHeader', 'navName', 'themeToggle',
            'heroAvatar', 'heroTagline', 'heroName', 'heroRole', 'heroLinks',
            'aboutText', 'skillGrid', 'projectGrid',
            'contactMessage', 'contactLinks', 'footerText'
        ];
        ids.forEach((id) => { this.el[id] = document.getElementById(id); });
    }

    bindEvents() {
        this.el.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    /* ===================== 렌더링 ===================== */

    renderAll() {
        this.renderMeta();
        this.renderHero();
        this.renderAbout();
        this.renderSkills();
        this.renderProjects();
        this.renderContact();
    }

    renderMeta() {
        document.title = `${PROFILE.name} · ${PROFILE.role}`;
        this.el.navName.textContent = PROFILE.nameEn || PROFILE.name;
        this.el.footerText.textContent =
            `© ${new Date().getFullYear()} ${PROFILE.name}. Built with HTML, Tailwind CSS & vanilla JS.`;
    }

    renderHero() {
        this.el.heroAvatar.textContent = this.getInitials();
        this.el.heroTagline.textContent = PROFILE.tagline;
        this.el.heroName.textContent = PROFILE.name;
        this.el.heroRole.textContent = PROFILE.role;

        const c = PROFILE.contact || {};
        const buttons = [];

        if (c.github) {
            buttons.push(`
                <a href="${this.safeUrl(c.github)}" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                    ${this.icon('github')} GitHub
                </a>`);
        }
        if (c.email) {
            buttons.push(`
                <a href="mailto:${this.escapeHtml(c.email)}"
                   class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
                    ${this.icon('mail')} Email
                </a>`);
        }

        this.el.heroLinks.innerHTML = buttons.join('');
    }

    renderAbout() {
        this.el.aboutText.innerHTML = (PROFILE.about || [])
            .map((line) => `<p>${this.escapeHtml(line)}</p>`)
            .join('');
    }

    renderSkills() {
        this.el.skillGrid.innerHTML = (PROFILE.skills || []).map((skill) => {
            const level = Math.max(0, Math.min(100, Number(skill.level) || 0));
            const icon = skill.icon
                ? `<span class="mr-1.5">${this.escapeHtml(skill.icon)}</span>`
                : '';

            return `
                <div>
                    <div class="mb-2 flex items-baseline justify-between">
                        <span class="text-[15px] font-medium text-slate-800 dark:text-slate-200">
                            ${icon}${this.escapeHtml(skill.name)}
                        </span>
                        <span class="text-xs tabular-nums text-slate-400 dark:text-slate-500">${level}%</span>
                    </div>
                    <div class="skill-bar">
                        <span class="skill-bar-fill" data-level="${level}"></span>
                    </div>
                </div>`;
        }).join('');
    }

    renderProjects() {
        this.el.projectGrid.innerHTML = (PROFILE.projects || []).map((project) => {
            const tags = (project.tags || []).map((tag) => `
                <span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    ${this.escapeHtml(tag)}
                </span>`).join('');

            // link 가 비어 있으면 버튼 자체를 출력하지 않음
            const link = project.link ? `
                <a href="${this.safeUrl(project.link)}" target="_blank" rel="noopener noreferrer"
                   class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                    프로젝트 보기 ${this.icon('arrow')}
                </a>` : '';

            return `
                <article class="project-card flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
                    <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl dark:bg-indigo-500/10">
                        ${this.escapeHtml(project.emoji || '📁')}
                    </div>
                    <h3 class="text-lg font-semibold text-slate-900 dark:text-white">${this.escapeHtml(project.title)}</h3>
                    <p class="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                        ${this.escapeHtml(project.description)}
                    </p>
                    <div class="mt-4 flex flex-wrap gap-1.5">${tags}</div>
                    ${link}
                </article>`;
        }).join('');
    }

    renderContact() {
        const c = PROFILE.contact || {};
        this.el.contactMessage.textContent = c.message || '';

        // 값이 비어 있는 항목은 아예 렌더링하지 않음
        const items = [
            { label: 'Email', value: c.email, href: c.email ? `mailto:${c.email}` : '', icon: 'mail', external: false },
            { label: 'GitHub', value: c.github, href: c.github, icon: 'github', external: true },
            { label: 'LinkedIn', value: c.linkedin, href: c.linkedin, icon: 'link', external: true },
            { label: 'Blog', value: c.blog, href: c.blog, icon: 'link', external: true }
        ].filter((item) => item.value);

        this.el.contactLinks.innerHTML = items.map((item) => `
            <a href="${this.safeUrl(item.href)}"
               ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
               class="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-slate-800 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/5">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-indigo-500/15 dark:group-hover:text-indigo-400">
                    ${this.icon(item.icon)}
                </span>
                <span class="min-w-0">
                    <span class="block text-xs font-medium uppercase tracking-wider text-slate-400">${this.escapeHtml(item.label)}</span>
                    <span class="block truncate text-[15px] text-slate-800 dark:text-slate-200">${this.escapeHtml(item.value)}</span>
                </span>
            </a>`).join('');
    }

    /* ===================== 다크모드 ===================== */
    /* 최초 적용은 index.html <head> 의 인라인 스크립트가 담당 (FOUC 방지) */

    toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) { /* 저장 실패는 무시 — 화면 전환 자체는 동작 */ }
    }

    /* ===================== 스크롤 등장 애니메이션 ===================== */

    initReveal() {
        const sections = document.querySelectorAll('.reveal');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // 모션 최소화 설정이거나 IntersectionObserver 미지원이면 즉시 전부 표시
        if (reduceMotion || !('IntersectionObserver' in window)) {
            sections.forEach((section) => {
                section.classList.add('reveal-visible');
                this.fillSkillBars(section);
            });
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('reveal-visible');
                this.fillSkillBars(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        sections.forEach((section) => observer.observe(section));
    }

    // 섹션이 화면에 들어온 시점에 게이지 바를 실제 비율로 채움
    fillSkillBars(section) {
        section.querySelectorAll('.skill-bar-fill').forEach((bar) => {
            bar.style.width = `${bar.dataset.level}%`;
        });
    }

    /* ===================== 앵커 스크롤 ===================== */

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (!target) return;

                event.preventDefault();
                // sticky 헤더에 가려지지 않도록 헤더 높이만큼 보정
                const offset = this.el.siteHeader.offsetHeight + 16;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: Math.max(0, top),
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                });
            });
        });
    }

    /* ===================== 헬퍼 ===================== */

    // 아바타 이니셜: 영문 이름이 있으면 각 단어 첫 글자, 없으면 이름 첫 글자
    getInitials() {
        const en = (PROFILE.nameEn || '').trim();
        if (en) {
            return en.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase();
        }
        return (PROFILE.name || '?').trim().charAt(0);
    }

    // data.js 에서 온 모든 문자열은 삽입 전 이 함수를 통과시킬 것
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text == null ? '' : String(text);
        return div.innerHTML;
    }

    // http(s) / mailto / 앵커 / 상대경로만 허용 (javascript: 등 차단)
    safeUrl(url) {
        const value = String(url || '').trim();
        return /^(https?:\/\/|mailto:|#|\/)/i.test(value) ? this.escapeHtml(value) : '#';
    }

    icon(name) {
        const attrs = 'class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
        const paths = {
            github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
            mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
            link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
            arrow: '<path d="M7 17 17 7M9 7h8v8"/>'
        };
        return `<svg ${attrs}>${paths[name] || ''}</svg>`;
    }
}

// 전역 인스턴스 생성 후 기동
const app = new ProfileApp();
document.addEventListener('DOMContentLoaded', () => app.init());
