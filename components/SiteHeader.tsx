import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">Byte<span>Lessons.</span></Link>
        <nav className="nav">
          <Link href="/roadmap/">Master roadmap</Link>
          <Link href="/#lessons">Written lessons</Link>
          <Link href="/#study-method">Study method</Link>
        </nav>
        <Link className="cta" href="/roadmap/">View roadmap →</Link>
      </div>
    </header>
  );
}
