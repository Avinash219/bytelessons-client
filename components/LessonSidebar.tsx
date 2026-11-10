import Link from "next/link";
import { articles } from "@/lib/articles";

export function LessonSidebar({ currentSlug }: { currentSlug: string }) {
  const currentIndex = articles.findIndex((article) => article.slug === currentSlug);
  const progress = ((currentIndex + 1) / articles.length) * 100;

  return (
    <aside className="lesson-sidebar">
      <Link href="/" className="back-academy">← All learning paths</Link>
      <div className="sidebar-label">LEARNING PATH</div>
      <div className="sidebar-path-title">GenAI Fundamentals</div>
      <div className="sidebar-progress"><span style={{ width: `${progress}%` }} /></div>
      <small className="sidebar-progress-label">{currentIndex + 1} of {articles.length} lessons</small>
      <nav className="sidebar-lessons" aria-label="Lesson navigation">
        {articles.map((article, index) => (
          <Link key={article.slug} href={`/learn/${article.slug}/`} className={article.slug === currentSlug ? "sidebar-lesson active" : "sidebar-lesson"}>
            <span className="sidebar-number">{String(index + 1).padStart(2, "0")}</span><span>{article.navTitle}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-tip"><strong>Learning tip</strong><p>Read actively. Pause after each section and explain the idea in your own words.</p></div>
    </aside>
  );
}
