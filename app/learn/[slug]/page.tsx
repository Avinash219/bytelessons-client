import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import { ArticleRenderer } from "@/components/ArticleRenderer";
import { LessonSidebar } from "@/components/LessonSidebar";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article ? { title: article.title, description: article.description } : {};
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articleIndex = articles.findIndex((item) => item.slug === slug);
  const article = articles[articleIndex];
  if (!article) notFound();

  const previous = articles[articleIndex - 1];
  const next = articles[articleIndex + 1];

  return (
    <main className="container learn">
      <div className="crumb"><Link href="/">Academy</Link> / GenAI Fundamentals / {article.title}</div>
      <div className="learn-grid">
        <LessonSidebar currentSlug={slug} />
        <article className="article">
          <div className="eyebrow">LESSON {String(articleIndex + 1).padStart(2, "0")} · {article.readTime.toUpperCase()}</div>
          <h1>{article.title}</h1>
          <p className="article-desc">{article.description}</p>
          <div className="meta">Personal study workspace · First principles → Python lab → exercises → architect thinking</div>
          <div className="objective"><b>Learning objective</b><br />{article.objective}</div>
          <ArticleRenderer article={article} />
          <div className="next">
            {previous ? <Link href={`/learn/${previous.slug}/`}>← {previous.title}</Link> : <Link href="/">← Academy home</Link>}
            {next ? <Link href={`/learn/${next.slug}/`}>{next.title} →</Link> : <Link href="/">Explore curriculum →</Link>}
          </div>
        </article>
        <TableOfContents sections={article.sections} />
      </div>
    </main>
  );
}
