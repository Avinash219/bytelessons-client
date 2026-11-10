import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
export const metadata: Metadata = { title: { default: "ByteLessons — GenAI Academy", template: "%s | ByteLessons" }, description: "Learn Generative AI, RAG and Agentic AI through practical lessons and architect-level thinking.", metadataBase: new URL("https://bytelessons.com") };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><SiteHeader />{children}<SiteFooter /></body></html>; }
