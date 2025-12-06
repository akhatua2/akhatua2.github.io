import Link from "next/link";

export const metadata = {
  title: "Experience — Arpan Khatua",
};

export default function Experience() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-14 sm:px-10">
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="link-underline hover:text-foreground">
          Home
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground">Experience</span>
      </nav>

      <section className="fade-up flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Experience</p>
        <h1
          className="text-3xl font-semibold text-foreground"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Work that shaped how I build.
        </h1>
      </section>

      <section className="fade-up flex flex-col gap-6">
        <article className="flex flex-col gap-2 border-b border-border pb-5">
          <h2
            className="text-xl font-semibold text-foreground"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Research Assistant — Stanford AI Lab
          </h2>
          <p className="text-sm text-muted">Sep 2024 – Present · Stanford, CA</p>
          <ul className="ml-5 list-disc space-y-2 text-base leading-relaxed text-foreground">
            <li>Socially intelligent agent systems for nuanced human-AI interaction.</li>
            <li>Corpus-level inconsistency detection for LLM outputs.</li>
            <li>Relational positional embeddings for transformer models.</li>
          </ul>
        </article>

        <article className="flex flex-col gap-2 border-b border-border pb-5">
          <h2
            className="text-xl font-semibold text-foreground"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Software Engineer IC4 — Meta
          </h2>
          <p className="text-sm text-muted">Jan 2023 – Sep 2024 · Menlo Park, CA</p>
          <ul className="ml-5 list-disc space-y-2 text-base leading-relaxed text-foreground">
            <li>Onboarding flows that increased daily group creations by 3%.</li>
            <li>Privacy and admin uplift for admin-less communities.</li>
            <li>GenAI summaries and answer agents for Groups.</li>
          </ul>
        </article>

        <article className="flex flex-col gap-2">
          <h2
            className="text-xl font-semibold text-foreground"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Software Engineering Intern — Meta
          </h2>
          <p className="text-sm text-muted">May 2022 – Aug 2022 · New York, NY</p>
          <ul className="ml-5 list-disc space-y-2 text-base leading-relaxed text-foreground">
            <li>Infinite scroll comments and polls that increased watch time.</li>
            <li>E2E testing framework and docs adopted by 50+ teams.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

