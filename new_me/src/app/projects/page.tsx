import Link from "next/link";

export const metadata = {
  title: "Projects — Arpan Khatua",
};

const projects = [
  {
    title: "IGB: Immense Graph Benchmark",
    summary: "Large public graph dataset for scaling GNN models and system optimization.",
  },
  {
    title: "CourseLoop (HackIllinois winner)",
    summary: "OCR + NLP pipeline that cut auto-grading time by 50%.",
  },
  {
    title: "Kaizen Journal (HackDuke winner)",
    summary:
      "Custom NLP classifier for mental health journaling with OCR and voice-to-text.",
  },
];

export default function Projects() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-14 sm:px-10">
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="link-underline hover:text-foreground">
          Home
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground">Projects</span>
      </nav>

      <section className="fade-up flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Projects</p>
        <h1
          className="text-3xl font-semibold text-foreground"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Things I built to learn faster.
        </h1>
      </section>

      <section className="fade-up grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-border px-4 py-5 transition hover:-translate-y-1 hover:border-accent/60"
          >
            <h2
              className="text-lg font-semibold text-foreground"
              style={{ fontFamily: "var(--font-space)" }}
            >
              {project.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {project.summary}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

