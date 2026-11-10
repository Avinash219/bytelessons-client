import type { Metadata } from "next";
import Link from "next/link";
import { PhaseZeroLesson } from "@/components/PhaseZeroLesson";

export const metadata: Metadata = {
  title: "AI vs ML vs Deep Learning vs Generative AI",
  description: "An interactive, multilingual first-principles lesson in the ByteLessons personal learning workspace."
};

export default function PhaseZeroLessonPage() {
  return <><div className="gold-breadcrumb"><Link href="/">ByteLessons</Link> / <Link href="/roadmap/">Master roadmap</Link> / Phase 0 / Lesson 1</div><PhaseZeroLesson /></>;
}
