import Link from "next/link";
import { roadmapPhases, roadmapTopicCount } from "@/lib/roadmap";

export const metadata = {
  title: "Exhaustive GenAI Learning Roadmap",
  description: "A granular beginner-to-architect curriculum covering GenAI, data engineering, RAG, Agentic AI and enterprise architecture."
};

export default function RoadmapPage() {
  return (
    <main className="container roadmap-page">
      <div className="crumb"><Link href="/">Academy</Link> / Master Roadmap</div>
      <header className="roadmap-hero">
        <div className="eyebrow">THE COMPLETE LEARNING MAP</div>
        <h1>From absolute beginner to GenAI architect.</h1>
        <p>This is the master syllabus, not a promise that every topic is already a written lesson. Each topic will be expanded into one or more detailed lessons with simple examples, internal mechanics, practical work, exercises and senior-level interview preparation.</p>
        <div className="roadmap-metrics">
          <div><strong>{roadmapPhases.length}</strong><span>Learning phases</span></div>
          <div><strong>{roadmapTopicCount}+</strong><span>Granular topics</span></div>
          <div><strong>Beginner → Architect</strong><span>Depth target</span></div>
        </div>
      </header>

      <section className="roadmap-standards">
        <h2>Non-negotiable lesson standard</h2>
        <p>Every substantial topic follows the same learning pattern. We will split topics into smaller lessons whenever one lesson would become overloaded.</p>
        <ol>
          <li>Prerequisites and terminology explained from zero</li>
          <li>Simple analogy, worked example and visual mental model</li>
          <li>Internal mechanics, formulas and calculations where relevant</li>
          <li>Step-by-step Python implementation or simulation</li>
          <li>Hands-on lab with expected output and experiments</li>
          <li>Progressive exercises: beginner, intermediate, advanced and architect</li>
          <li>Common mistakes, edge cases, limitations and failure analysis</li>
          <li>Data, security, performance and enterprise implications</li>
          <li>Interview questions with detailed reasoning-based answers</li>
          <li>System design scenarios and mastery checks</li>
        </ol>
      </section>

      <div className="roadmap-phase-list">
        {roadmapPhases.map((phase) => (
          <details className="roadmap-phase" key={phase.id} open={phase.id === "00" || phase.id === "01"}>
            <summary>
              <span className="roadmap-phase-number">{phase.id}</span>
              <span className="roadmap-phase-heading"><strong>{phase.title}</strong><small>{phase.topics.length} topics · {phase.focus}</small></span>
              <span className="roadmap-chevron">+</span>
            </summary>
            <div className="roadmap-phase-content">
              <p className="roadmap-outcome"><strong>Mastery outcome:</strong> {phase.outcome}</p>
              {phase.id === "00" ? <p className="roadmap-outcome"><strong>Start the first written lesson:</strong> <Link href="/learn/ai-ml-dl-genai/">AI vs Machine Learning vs Deep Learning vs Generative AI →</Link></p> : null}
              <ol>
                {phase.topics.map((topic, index) => <li key={topic}><span>{String(index + 1).padStart(2, "0")}</span>{topic}</li>)}
              </ol>
            </div>
          </details>
        ))}
      </div>

      <section className="roadmap-note">
        <h2>How to interpret this roadmap</h2>
        <p>Topics are deliberately granular. Some will need multiple lessons, numerical walkthroughs and labs. We will not skip prerequisites to reach advanced frameworks quickly. The roadmap can grow whenever a missing prerequisite or important interview domain is identified.</p>
        <p><strong>Current written content:</strong> the new interactive Phase 0 foundation lesson plus five LLM foundation lessons. The rest of this roadmap is the planned syllabus and will be converted into complete lessons progressively.</p>
        <Link className="button" href="/learn/ai-ml-dl-genai/">Start Phase 0 Lesson 1 →</Link> <Link className="button secondary" href="/learn/how-llms-work/">Continue LLM lessons →</Link>
      </section>
    </main>
  );
}
