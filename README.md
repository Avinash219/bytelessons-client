# ByteLessons — GenAI Academy

A public, login-free GenAI learning academy built with Next.js, React and TypeScript. The site is configured for static export.

## Local development

```bash
npm install
npm run dev
```

## Validate and build

```bash
npm run typecheck
npm run build
```

The static website is generated in `out/`. For Hostinger, back up `public_html`, then upload the **contents** of `out/` directly into `public_html`.

No backend, database, login or API key is required. Lesson content lives in `lib/articles.ts`.

## Current curriculum

1. How Large Language Models Work
2. Tokenization & Context Windows
3. Transformer Architecture Explained
4. Self-Attention: Query, Key & Value
5. Model Training vs Inference
