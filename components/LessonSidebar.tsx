import Link from "next/link";
import { articles } from "@/lib/articles";

export function LessonSidebar({ currentSlug }: { currentSlug: string }) {
  return (
    <aside className="sidebar">
      <b>GENAI FUNDAMENTALS</b>
      {articles.map((article, index) => (
        <Link
          className={`side-link ${article.slug === currentSlug ? "active" : ""}`}
          href={`/learn/${article.slug}/`}
          key={article.slug}
        >
          {String(index + 1).padStart(2, "0")} · {article.title}
        </Link>
      ))}
    </aside>
  );
}
