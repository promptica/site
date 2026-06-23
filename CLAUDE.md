# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Что это

Лендинг AI-агентства **Promptica** — статический сайт без сборки (HTML + CSS + ванильный JS). Источник истины для визуала — дизайн в Pencil (`.pen`); код в `src/` генерируется/синхронизируется из дизайна.

## Команды

Сборки нет. Зависимостей нет (`package.json` отсутствует).

- **Локальный просмотр:** открыть `src/index.html` в браузере или `npx serve src`
- **Деплой:** автоматически на GitHub Pages при push в `main` (`.github/workflows/deploy.yml` раздаёт папку `src/`). Ручной запуск — `workflow_dispatch`.

Тестов и линтеров нет.

## Архитектура

Поток: **`design/promptica.pen` (дизайн) → `src/` (сгенерированный сайт)**.

- `design/promptica.pen` — единственный источник дизайна, версионируется в git. **Файл зашифрован — читать/править только через инструменты MCP `pencil`, никогда через Read/Grep/Edit.** Перед любой работой с `.pen` вызвать `get_editor_state(include_schema: true)`.
- `src/index.html` — разметка лендинга (секции: hero, trust, services, approach, why, cases, cta, footer).
- `src/styles.css` — все стили. **Дизайн-токены из `.pen` живут как CSS-переменные в `:root`** (цвета, радиусы, шрифты, отступы). При изменении дизайна правки токенов идут сюда.
- `src/main.js` — две вещи: инициализация иконок Lucide (`lucide.createIcons()`) и typewriter-анимация hero-заголовка.
- Шрифты (Google Fonts) и иконки (Lucide) подключаются по CDN, локально не хранятся.

При расхождении кода и дизайна источник истины — `.pen`. Меняя верстку/визуал, синхронизируй с дизайном, а не правь только `src/`.

## Соглашения и нетривиальные детали

- **Hero-заголовок (typewriter).** В `.pen` сменный сегмент статичен; в коде (`main.js`) он анимируется эффектом «печатает/стирает» по набору фраз. Тайминги — константы `TYPE`/`ERASE`/`HOLD`/`GAP`. Уважается `prefers-reduced-motion`: при reduce анимация отключается, показывается одна фраза статично. Первая фраза уже отрисована в HTML — JS стартует со стирания.
- **Секция «Кейсы»** — это «Примеры задач», иллюстративные, **без реальных клиентов и цифр**. Якорь `#cases`; в `.pen` помечена `metadata.anchor = "cases"`.
- Фавиконки — фирменный набор Promptica (svg/ico/png + `site.webmanifest`) в `src/`.
- Язык контента и коммитов — русский. Формат коммитов — Conventional Commits с областью (`feat(hero):`, `design(cases):`, `fix(...)`, `ci:`).
