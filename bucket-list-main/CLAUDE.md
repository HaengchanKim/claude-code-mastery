# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-page bucket-list web app. Pure static site — no framework, no build tool, no package manager, no server, no test suite. Data persists client-side only, in the browser's `localStorage`.

## Running the app

There is no build step. Open `index.html` directly in a browser, or serve it with any static server:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

VS Code's "Live Server" extension also works (right-click `index.html` → Open with Live Server).

There are no lint, test, or build commands configured in this repo (no `package.json`).

## Architecture

Three files carry all the logic, loaded in this order from `index.html`: `js/storage.js` then `js/app.js`. Styling is Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com">`) plus `css/styles.css` for animations, the active-filter-button state, and a dark-mode media query.

**Strict two-layer split — preserve this when adding features:**

- **`js/storage.js`** — `BucketStorage`, a plain object acting as the data layer. It owns all `localStorage` reads/writes under the key `bucketList` and never touches the DOM. Public methods: `load`, `save`, `addItem`, `updateItem`, `deleteItem`, `toggleComplete`, `getStats`, `getFilteredList(filter)`. Every mutation method reads the full list, mutates, and writes the full list back — there's no incremental/indexed storage.

  Item schema:
  ```js
  { id: "<Date.now() string>", title: string, completed: boolean, createdAt: ISOString, completedAt: ISOString|null }
  ```

- **`js/app.js`** — `BucketListApp` class, the UI layer. `init()` caches DOM elements (`cacheElements`), binds events (`bindEvents`), then calls `render()`. There is no fine-grained DOM diffing: every state change (`handleAdd`, `handleToggle`, `handleEditSubmit`, `handleDelete`, `handleFilter`) ends by calling `BucketStorage` and then re-invoking `this.render()`, which rebuilds the entire list's HTML via `createBucketItemHTML` and reassigns `innerHTML`.

  A single global instance `app` is created on `DOMContentLoaded` (`js/app.js:257-259`) and referenced by name in inline `onclick="app.handle...(...)"` attributes generated inside `createBucketItemHTML`. Keep using the global `app` reference for any new inline handlers rather than introducing addEventListener-based delegation, to stay consistent with the existing pattern.

  User-provided text is always passed through `escapeHtml()` before being interpolated into template strings — do this for any new field that renders user input.

- **`index.html`** holds all markup, including the add form, filter buttons (`data-filter="all|active|completed"`), the list container (`#bucketListContainer`), an empty-state block (`#emptyState`), and the edit modal (`#editModal`). `js/app.js` looks up these exact IDs/classes in `cacheElements()` — renaming or removing an element there requires updating that method.

## Conventions

- Comments and README are in Korean; match that style for in-repo documentation.
- No frameworks: don't introduce React/Vue/build tooling for small features — extend `BucketStorage`/`BucketListApp` in place, consistent with the "why keep it vanilla" intent stated in the README.
- Filter values are the string literals `'all'`, `'active'`, `'completed'` — used both as `data-filter` attribute values and as the `filter` argument to `BucketStorage.getFilteredList`.
