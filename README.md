# ByteLessons — Personal GenAI Study Workspace

ByteLessons is a personal, deliberately exhaustive learning workspace for Generative AI, Data-centric GenAI, RAG, Agentic AI and enterprise AI architecture. It is intended to teach from absolute beginner foundations through senior, staff and architect-level understanding.

## Learning promise

This is not a quick-reference blog or a short list of interview definitions. The curriculum is designed to expand whenever a prerequisite or important subtopic needs its own lesson. Lesson count and duration are not capped.

Every substantial topic follows this study pattern:

1. Prerequisites and terminology explained from zero
2. Simple analogy, worked example and visual mental model
3. Internal mechanics, formulas and calculations where relevant
4. Step-by-step Python implementation or simulation
5. Hands-on lab with expected output and experiments
6. Progressive exercises: beginner, intermediate, advanced and architect
7. Common mistakes, edge cases, limitations and failure analysis
8. Data, security, performance and enterprise implications
9. Interview questions with detailed reasoning-based answers
10. System design scenarios and mastery checks

Teaching style: conversational Hinglish explanations with English technical terminology. The target is the ability to explain, implement, debug, evaluate, design and defend systems—not memorize definitions.

## Master roadmap

The roadmap is maintained in `lib/roadmap.ts` and displayed at `/roadmap/`. It currently contains 16 phases and more than 400 granular topics, covering:

- AI, machine learning, mathematics and data foundations
- LLM internals, Transformers, training, adaptation and inference
- Prompt engineering and LLM application engineering
- Data engineering for GenAI
- Embeddings, vector search and vector databases
- RAG fundamentals and advanced retrieval
- Data-centric GenAI, Text-to-SQL and analytics copilots
- Agentic AI foundations and design patterns
- Multi-agent systems and coordination
- LangChain, LangGraph, MCP and agent interoperability
- Enterprise GenAI platform architecture
- AI security, governance and responsible AI
- Evaluation, testing, observability and reliability
- Advanced and multimodal GenAI
- Senior, Staff and Architect interview mastery

The roadmap is the master syllabus, not a claim that every listed topic already has a fully written lesson. The homepage and roadmap explicitly distinguish planned syllabus topics from currently written lesson content.

## Current written lessons

The existing LLM foundation module contains five expanded lessons:

- How Large Language Models Work
- Tokenization and Context Windows
- Transformer Architecture
- Self-Attention: Query, Key and Value
- Training vs Inference

These lessons include Python labs, progressive exercises and interview drills. The remaining roadmap topics will be converted into full lessons progressively.

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
6. Test the home page, roadmap and each lesson URL.

Upload only the contents of `out/`. Do not upload `node_modules`, `.next` or the source project as the live website.

## Project structure

- `app/` — App Router pages, global layout and styles
- `app/roadmap/page.tsx` — exhaustive master roadmap
- `app/learn/[slug]/` — statically generated lesson route
- `components/` — shared navigation, article renderer, exercise cards and code block
- `lib/articles.ts` — written lesson content, exercises and article types
- `lib/roadmap.ts` — granular curriculum syllabus
- `public/diagrams/` — static diagrams and visual assets

## Add or edit a lesson

Lesson content is maintained in `lib/articles.ts`. Follow the `Article`, `Section` and `Exercise` types. A section can contain explanatory paragraphs, a Python code sample, progressive exercises and interview questions. Every exercise includes tasks and an expected outcome for self-assessment.

After editing content, run:

```bash
npm run typecheck
npm run build
```

## Important: visibility and sensitive information

The learning material is written for personal study, but this GitHub repository is currently public and the static site has no login or access control. Do not add private notes, company-confidential material, personal data, API keys or credentials here. If you want the source itself to be private, change the repository visibility in GitHub settings before adding private material.

## Static-export boundaries

This site intentionally has no server, database, API routes, server actions, user accounts or model API keys. Navigation and copy-code interactions run in the browser. Features such as saved progress, private notes, quizzes with stored scores or live model calls would require a separately designed backend or managed service.
