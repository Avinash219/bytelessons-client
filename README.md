# ByteLessons — Personal GenAI Study Workspace

ByteLessons is a structured, hands-on learning workspace for studying Generative AI, RAG, Agentic AI and enterprise AI architecture. The content is designed as a personal technical study curriculum rather than short public-facing blog posts.

The learning approach is deliberately deep:

1. First-principles explanation of the concept
2. Internal working and mental models
3. Runnable Python simulations and hands-on labs
4. Exercises from beginner to architect level
5. Expected outcomes and self-checks
6. Architect-level trade-offs and interview drills

## Current curriculum

The first module contains five expanded foundation lessons:

- How Large Language Models Work
- Tokenization and Context Windows
- Transformer Architecture
- Self-Attention: Query, Key and Value
- Training vs Inference

The lessons include Python labs and progressive exercises. The next planned modules are Prompt Engineering, Embeddings and Vector Search, RAG, Agentic AI, and Enterprise AI Architecture.

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Static HTML export
- No backend, database, authentication or runtime model API dependency

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

1. Run the production build on a machine with dependencies installed.
2. Open Hostinger hPanel and the File Manager for the domain.
3. Back up any existing website files in `public_html`.
4. Upload the **contents** of the generated `out/` folder into `public_html`.
5. Confirm that `index.html` is directly inside `public_html`, not nested under another `out` folder.
6. Test the home page and each lesson URL in a private browser window.

Upload only the contents of `out/`. Do not upload `node_modules`, `.next`, or the source project as the live website.

## Project structure

- `app/` — App Router pages, global layout and styles
- `app/learn/[slug]/` — statically generated lesson route
- `components/` — shared navigation, article renderer, exercise cards and copyable code block
- `lib/articles.ts` — lesson content, exercises and article types
- `public/diagrams/` — static diagrams and visual assets

## Add or edit a lesson

Lesson content is maintained in `lib/articles.ts`. Follow the `Article`, `Section` and `Exercise` types. A section can contain explanatory paragraphs, a Python code sample, progressive exercises and interview questions. Every exercise includes tasks and an expected outcome for self-assessment.

After editing content, run:

```bash
npm run typecheck
npm run build
```

Then upload the refreshed `out/` contents to Hostinger if you choose to deploy it.

## Important: visibility and sensitive information

The learning material is written for personal study, but this GitHub repository is currently public and the static site has no login or access control. Do not add private notes, company-confidential material, personal data, API keys or credentials here. If you want the source itself to be private, change the repository visibility in GitHub settings before adding private material.

## Static-export boundaries

This site intentionally has no server, database, API routes, server actions, user accounts or model API keys. Navigation and copy-code interactions run in the browser. Features such as saved progress, private notes, quizzes with stored scores or live model calls would require a separately designed backend or managed service.
