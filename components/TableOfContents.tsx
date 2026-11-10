import Link from "next/link";

type Section = { heading: string };

export function TableOfContents({ sections }: { sections: Section[] }) {
  return (
    <aside className="toc">
      <b>IN THIS LESSON</b>
      {sections.map((section, index) => (
        <Link href={`#section-${index + 1}`} key={section.heading}>
          {section.heading}
        </Link>
      ))}
    </aside>
  );
}
