# ByteLessons — GenAI Academy

A login-free, static-export learning portal for Generative AI and enterprise AI architecture. The current curriculum contains five foundational lessons covering LLMs, tokens and context windows, Transformer architecture, self-attention, and training vs inference.

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Static HTML export
- No backend, database, authentication, or runtime API dependency

## Requirements

- Node.js 20.9 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Validate and build

```bash
npm run typecheck
npm run build
```

The project uses `output: "export"` in `next.config.ts`. A successful production build generates the deployable static site in `out/`.

## Deploy to Hostinger

1. Run the production build on a machine with the dependencies installed.
2. Open Hostinger hPanel and the File Manager for the ByteLessons domain.
3. Back up any existing website files in `public_html`.
4. Upload the **contents** of the generated `out/` folder into `public_html`.
5. Confirm that `index.html` is directly inside `public_html`, not nested under another `out` folder.
6. Test the home page and each lesson URL in a private browser window.

Upload only the contents of `out/`. Do not upload `node_modules`, `.next`, or the source project as the live website.

## Project structure

- `app/` — App Router pages, global layout, and styles
- `app/learn/[slug]/` — static lesson route
- `components/` — shared header, footer, lesson navigation, table of contents, article renderer, and copyable code block
- `lib/articles.ts` — lesson content and article types
- `public/diagrams/` — static diagrams and visual assets

## Add or edit a lesson

Lesson content is maintained in `lib/articles.ts`. Follow the existing `Article` type and section structure. Each lesson slug is used to generate a static route. After editing content, run:

```bash
npm run typecheck
npm run build
```

Then upload the refreshed `out/` contents to Hostinger.

## Static-export boundaries

This site intentionally has no server, database, API routes, server actions, user accounts, or secret keys. Navigation and copy-code interactions run in the browser. Any future feature requiring persistent user progress, private content, or model API calls will need a separately designed backend or managed service.

## Safe publishing workflow

- Make changes locally and keep commits small and descriptive.
- Run type-checking and a production build before deployment.
- Keep a backup of the last known-good `out/` folder.
- Never publish company-confidential information, private documents, API keys, or credentials.
