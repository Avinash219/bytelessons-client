import Link from "next/link";
import { articles } from "@/lib/articles";

const learningStages = [
  ["01", "GenAI foundations", "LLMs, tokens, Transformers, attention, training and inference", "In progress"],
  ["02", "Prompt engineering", "Instruction hierarchy, context design, structured output and evaluation", "Planned"],
  ["03", "Embeddings and vector search", "Embedding spaces, similarity, indexing and retrieval", "Planned"],
  ["04", "RAG systems", "Ingestion, chunking, retrieval, reranking, grounding and evaluation", "Planned"],
  ["05", "Agentic AI", "Tool use, planning, state, memory, workflows and multi-agent patterns", "Planned"],
  ["06", "Enterprise AI architecture", "Security, governance, observability, cost, scale and system design", "Planned"],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">PERSONAL GENAI STUDY WORKSPACE</div>
            <h1>Understand deeply.<br /><span>Build confidently.</span></h1>
            <p className="lead">A structured, hands-on learning path from Generative AI fundamentals to enterprise-grade Agentic AI architecture. This workspace is designed for deliberate study, practical experiments and architect-level understanding — not quick content consumption.</p>
            <div className="actions">
              <Link className="button" href="/learn/how-llms-work/">Continue learning →</Link>
              <a className="button secondary" href="#curriculum">View study roadmap</a>
            </div>
          </div>
          <div className="hero-visual">
            <strong>B<span>.</span></strong>
            <div>LEARN · EXPERIMENT · EXPLAIN</div>
            <small>CONCEPTS TO ARCHITECTURE</small>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          <div><strong>{articles.length} deep lessons</strong><span>Foundational curriculum</span></div>
          <div><strong>Python labs</strong><span>Run and modify the code</span></div>
          <div><strong>34 exercises</strong><span>Beginner to architect level</span></div>
          <div><strong>Interview drills</strong><span>Explain and defend decisions</span></div>
        </div>
      </section>

      <section className="container section" id="curriculum">
        <div className="eyebrow">LONG-TERM STUDY ROADMAP</div>
        <h2>Learn in the right sequence</h2>
        <p className="section-intro">First understand the underlying mechanisms. Then implement them. Only after that move into frameworks and enterprise architecture.</p>
        <div className="path-grid">
          {learningStages.map(([number, title, description, status]) => (
            <article className="path" key={number}>
              <span className="num">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <small>{status}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="lessons" style={{ background: "#f7f9fc" }}>
        <div className="container">
          <div className="eyebrow">MODULE 01 · FOUNDATIONS</div>
          <h2>Start with the fundamentals</h2>
          <p className="section-intro">These lessons are intentionally substantial. Each combines conceptual explanations, Python simulations, exercises, self-checks and architect-level interview questions.</p>
          <div className="lesson-list">
            {articles.map((article, index) => (
              <Link className="lesson" href={`/learn/${article.slug}/`} key={article.slug}>
                <span className="lesson-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="lesson-main"><strong>{article.title}</strong><small>{article.description}</small></span>
                <span className="lesson-time">{article.readTime} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section" id="study-method">
        <div className="banner">
          <div className="eyebrow">HOW TO USE THIS WORKSPACE</div>
          <h2>Read less passively.<br />Experiment more deliberately.</h2>
          <p>For every topic: understand the concept, run the Python lab, change the code, complete the exercises without looking at the expected outcome, then explain the architecture and trade-offs aloud. Keep your own notes and revisit anything you cannot explain simply.</p>
        </div>
      </section>
    </main>
  );
}
