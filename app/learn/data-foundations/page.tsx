import type { Metadata } from "next";
import Link from "next/link";
import { DataFoundationsLesson } from "@/components/DataFoundationsLesson";

export const metadata: Metadata = {
  title: "Data, Features, Labels, and Evaluation | ByteLessons",
  description: "An interactive, multilingual first-principles lesson on dataset design, labels, train/validation/test splits, leakage, and generalization."
};

export default function DataFoundationsPage() {
  return <><div className="gold-breadcrumb"><Link href="/">ByteLessons</Link> / <Link href="/roadmap/">Master roadmap</Link> / Phase 0 / Lesson 2</div><DataFoundationsLesson /></>;
}
