import Link from "next/link";

type Heading = { id: string; title: string };

export function TableOfContents({ headings }: { headings: Heading[] }) {
  return (
    <aside className="toc-sidebar">
      <div className="toc-title">ON THIS PAGE</div>
      <nav>{headings.map((heading) => <Link key={heading.id} href={`#${heading.id}`}>{heading.title}</Link>)}</nav>
      <div className="toc-note">Tip: Use this outline to revisit a concept quickly.</div>
    </aside>
  );
}
