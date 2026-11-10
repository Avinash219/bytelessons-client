import Link from "next/link";
import { articles } from "@/lib/articles";
import { roadmapPhases, roadmapTopicCount } from "@/lib/roadmap";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">PERSONAL GENAI STUDY WORKSPACE</div>
            <h1>Understand deeply.<br /><span>Build confidently.</span></h1>
            <p className="lead">A deliberately exhaustive, hands-on curriculum from absolute AI foundations to senior and architect-level Generative AI, Data GenAI and Agentic AI. No rushed summaries. No artificial lesson-count limit.</p>
            <div className="actions">
              <Link className="button" href="/learn/ai-ml-dl-genai/">Continue learning →</Link>
              <Link className="button secondary" href="/roadmap/">Explore the complete roadmap</Link>
            </div>
          </div>
          <div className="hero-visual">
            <strong>B<span>.</span></strong>
            <div>LEARN · EXPERIMENT · EXPLAIN</div>
            <small>ZERO TO ENTERPRISE ARCHITECTURE</small>
          </div>
        </div>
      </section>

      <section className="container section" id="start-here">
        <div className="featured-lesson">
          <div><div className="eyebrow">START HERE · PHASE 0 · LESSON 01</div><h2>AI vs Machine Learning vs Deep Learning vs Generative AI</h2><p>Begin with a fully interactive, multilingual first-principles lesson. Switch between Hinglish, English and Hindi; explore animated concept maps, run a Python simulation, test your understanding and practise architect-level decisions.</p><div className="featured-tags"><span>3 languages</span><span>Interactive diagrams</span><span>Python lab</span><span>Interview + architect drills</span></div></div>
          <Link className="button" href="/learn/ai-ml-dl-genai/">Start Phase 0 Lesson 1 →</Link>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          <div><strong>{roadmapPhases.length} phases</strong><span>Structured learning sequence</span></div>
          <div><strong>{roadmapTopicCount}+ topics</strong><span>Granular syllabus</span></div>
          <div><strong>{articles.length} written lessons</strong><span>Current foundation content</span></div>
          <div><strong>Hands-on first</strong><span>Labs, exercises and interview drills</span></div>
        </div>
      </section>

      <section className="container section" id="curriculum">
        <div className="eyebrow">LEARNING SEQUENCE</div>
        <h2>A complete path, not a collection of random tutorials</h2>
        <p className="section-intro">Build fundamentals first, then data and retrieval, then agents, and finally enterprise architecture, security, evaluation and interview mastery.</p>
        <div className="path-grid">
          {roadmapPhases.map((phase) => (
            <article className="path" key={phase.id}>
              <span className="num">PHASE {phase.id}</span>
              <h3>{phase.title}</h3>
              <p>{phase.focus}</p>
              <small>{phase.topics.length} granular topics</small>
            </article>
          ))}
        </div>
        <div className="roadmap-link-row"><Link className="button" href="/roadmap/">Open all {roadmapTopicCount}+ roadmap topics →</Link></div>
      </section>

      <section className="section" id="lessons" style={{ background: "#f7f9fc" }}>
        <div className="container">
          <div className="eyebrow">CURRENTLY WRITTEN · LLM FOUNDATIONS</div>
          <h2>Detailed lessons available now</h2>
          <p className="section-intro">The roadmap is the full syllabus. These are the lessons already written in the repository; upcoming topics will be developed to the same deeper standard before being marked complete.</p>
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
          <div className="eyebrow">HOW WE STUDY</div>
          <h2>Understand it. Implement it. Defend it.</h2>
          <p>For each topic, start with a simple explanation, inspect the internal mechanics, work through examples, run Python experiments, complete progressive exercises and finally defend the design choices in an architect-level scenario. If a prerequisite is missing, we add lessons. We do not rush to the next phase.</p>
        </div>
      </section>
    </main>
  );
}
