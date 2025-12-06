import Link from "next/link";

export const metadata = {
  title: "Contact — Arpan Khatua",
};

export default function Contact() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-14 sm:px-10">
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="link-underline hover:text-foreground">
          Home
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground">Contact</span>
      </nav>

      <section className="fade-up flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Contact</p>
        <h1
          className="text-3xl font-semibold text-foreground"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Say hello.
        </h1>
      </section>

      <section className="fade-up flex flex-col gap-4 text-base text-foreground">
        <p className="max-w-xl">
          Reach out for collaborations, experiments, or to swap notes on ML and tooling.
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

