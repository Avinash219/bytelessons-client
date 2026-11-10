import { CodeBlock } from "@/components/CodeBlock";
import type { Article, Exercise } from "@/lib/articles";

function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  return (
    <div className="exercise-card">
      <div className="exercise-topline">
        <span className="exercise-number">PRACTICE {String(index + 1).padStart(2, "0")}</span>
        <span className={`exercise-level level-${exercise.level.toLowerCase()}`}>{exercise.level}</span>
      </div>
      <h3>{exercise.title}</h3>
      <p className="exercise-objective">{exercise.objective}</p>
      <ol>{exercise.tasks.map((task, taskIndex) => <li key={taskIndex}>{task}</li>)}</ol>
      <details className="expected-outcome">
        <summary>Expected outcome / self-check</summary>
        <p>{exercise.expectedOutcome}</p>
      </details>
    </div>
  );
}

export function ArticleRenderer({ article }: { article: Article }) {
  let exerciseIndex = 0;

  return (
    <div className="article-content">
      <div className="study-instructions">
        <strong>How to study this lesson</strong>
        <p>Read one section at a time. Run the Python lab yourself instead of only reading it. Attempt each exercise before opening its self-check. Keep your own notes and explain the concept aloud in your own words.</p>
      </div>

      {article.sections.map((section, sectionIndex) => (
        <section className="lesson-section" key={section.heading}>
          <h2 id={`section-${sectionIndex + 1}`}>{section.heading}</h2>
          {section.body.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
          {section.code ? <CodeBlock code={section.code} title={section.codeTitle ?? "Python hands-on lab"} /> : null}
          {section.exercises?.map((exercise) => {
            exerciseIndex += 1;
            return <ExerciseCard key={exercise.title} exercise={exercise} index={exerciseIndex} />;
          })}
          {section.qa?.length ? (
            <div className="interview-drill">
              <h3>Interview drill</h3>
              {section.qa.map((item) => (
                <details className="qa" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          ) : null}
        </section>
      ))}

      <div className="mastery-check">
        <strong>Lesson completion rule</strong>
        <p>Do not mark this lesson complete just because you reached the bottom. You should be able to explain the main mechanism without notes, run and modify every code lab, complete the beginner and intermediate exercises, and defend the architect-level design choices.</p>
      </div>
    </div>
  );
}
