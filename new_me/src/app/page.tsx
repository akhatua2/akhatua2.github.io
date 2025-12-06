import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-12 px-6 py-14 sm:px-10">
      <header className="flex flex-col gap-6">
        <nav className="flex items-center justify-between text-sm text-muted">
          <div className="flex items-center gap-2">
            <span
              className="text-sm uppercase tracking-[0.16em] text-foreground"
              style={{ fontFamily: "var(--font-space)" }}
            >
              AK
            </span>
            <span className="h-px w-8 bg-foreground/40" />
            <span className="text-muted">ML · Engineering · Writing</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#about" className="link-underline hover:text-foreground">
              About
            </Link>
            <Link href="/experience" className="link-underline hover:text-foreground">
              Experience
            </Link>
            <Link href="/writing" className="link-underline hover:text-foreground">
              Writing
            </Link>
            <Link href="/projects" className="link-underline hover:text-foreground">
              Projects
            </Link>
            <Link href="/contact" className="link-underline hover:text-foreground">
              Contact
            </Link>
          </div>
        </nav>

        <section id="about" className="fade-up flex flex-col gap-4">
          <p
            className="text-xs uppercase tracking-[0.16em] text-muted"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Arpan Khatua
          </p>
          <h1
            className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Building things at the intersection of machine learning and product.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground">
            I work on applied ML, thoughtful tooling, and crisp writing. I like clear
            systems, fast experiments, and shipping work that feels intentional.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-muted">
            <span className="pill border-accent/30 bg-accent/5 text-accent">ML</span>
            <span className="pill border-accent/30 bg-accent/5 text-accent">Engineering</span>
            <span className="pill border-accent/30 bg-accent/5 text-accent">Writing</span>
          </div>
        </section>
      </header>

      <section className="fade-up flex flex-col gap-3">
        <p
          className="text-xs uppercase tracking-[0.16em] text-muted"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Recent writing
        </p>
        <div className="flex flex-col gap-4">
          <article className="flex flex-col gap-1">
            <h2
              className="text-xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Getting Started with Machine Learning
            </h2>
            <p className="text-sm text-muted">Dec 16, 2024 · 9 min read</p>
            <p className="text-base text-foreground">
              A compact path: math refresh, Python comfort, and projects that build momentum.
            </p>
            <Link
              className="text-sm text-accent underline decoration-accent/40 underline-offset-4"
              href="/writing"
            >
              Read more
            </Link>
          </article>
        </div>
      </section>

      <section className="fade-up flex flex-col gap-4">
        <p
          className="text-xs uppercase tracking-[0.16em] text-muted"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Explore
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/experience"
            className="rounded-2xl border border-border px-4 py-5 transition hover:-translate-y-1 hover:border-accent/60"
          >
            <p className="text-sm text-muted">Work</p>
            <p
              className="text-lg font-semibold text-foreground"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Experience
            </p>
            <p className="text-sm text-muted">Stanford AI Lab, Meta IC4, Meta Intern.</p>
          </Link>
          <Link
            href="/projects"
            className="rounded-2xl border border-border px-4 py-5 transition hover:-translate-y-1 hover:border-accent/60"
          >
            <p className="text-sm text-muted">Builds</p>
            <p
              className="text-lg font-semibold text-foreground"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Projects
            </p>
            <p className="text-sm text-muted">IGB, CourseLoop, Kaizen Journal.</p>
          </Link>
          <Link
            href="/writing"
            className="rounded-2xl border border-border px-4 py-5 transition hover:-translate-y-1 hover:border-accent/60"
          >
            <p className="text-sm text-muted">Notes</p>
            <p
              className="text-lg font-semibold text-foreground"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Writing
            </p>
            <p className="text-sm text-muted">ML paths, tooling, and experiments.</p>
          </Link>
          <Link
            href="/contact"
            className="rounded-2xl border border-border px-4 py-5 transition hover:-translate-y-1 hover:border-accent/60"
          >
            <p className="text-sm text-muted">Say hi</p>
            <p
              className="text-lg font-semibold text-foreground"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Contact
            </p>
            <p className="text-sm text-muted">Email, LinkedIn, GitHub.</p>
          </Link>
        </div>
      </section>

      <section
        id="contact"
        className="fade-up flex flex-col gap-2 border-t border-border pt-8 text-base text-foreground"
      >
        <p
          className="text-xs uppercase tracking-[0.16em] text-muted"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Contact
        </p>
        <p className="max-w-xl">
          Reach out for collaborations, experiments, or just to swap notes on good ML tooling.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a className="text-accent underline decoration-accent/30" href="mailto:hello@example.com">
            Email
          </a>
          <a className="text-accent underline decoration-accent/30" href="#">
            LinkedIn
          </a>
          <a className="text-accent underline decoration-accent/30" href="#">
            GitHub
          </a>
        </div>
        <p
          className="pt-4 text-sm text-muted"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Crafted with a mix of sharp sans and soft serif—Prime Intellect edge, Claude calm.
        </p>
      </section>
      </main>
  );
}
