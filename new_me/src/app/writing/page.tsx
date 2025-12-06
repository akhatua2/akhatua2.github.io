import Link from "next/link";

export const metadata = {
  title: "Writing — Arpan Khatua",
};

const posts = [
  {
    title: "Getting Started with Machine Learning",
    date: "Dec 16, 2024",
    readingTime: "9 min read",
    summary: "A compact path: math refresh, Python comfort, and projects that build momentum.",
  },
  {
    title: "Taste, Craft, and Shipping Quickly",
    date: "Jan 18, 2025",
    readingTime: "5 min read",
    summary: "Constraints, narrative, and building products that feel intentional.",
  },
  {
    title: "Notes on Fast Experimentation",
    date: "Jan 3, 2025",
    readingTime: "6 min read",
    summary: "Eval harnesses, small loops, and measuring what matters.",
  },
];

export default function Writing() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-14 sm:px-10">
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="link-underline hover:text-foreground">
            Home
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground">Writing</span>
        </nav>

        <section className="fade-up flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Writing</p>
          <h1
            className="text-3xl font-semibold text-foreground"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Notes on ML, tooling, and building.
          </h1>
        </section>

        <section className="fade-up flex flex-col gap-5">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-2xl border border-border px-5 py-5 transition hover:-translate-y-1 hover:border-accent/60"
            >
              <div className="flex items-center justify-between text-sm text-muted">
                <span>{post.date}</span>
                <span>{post.readingTime}</span>
              </div>
              <h2
                className="mt-2 text-xl font-semibold text-foreground"
                style={{ fontFamily: "var(--font-space)" }}
              >
                {post.title}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-foreground">
                {post.summary}
              </p>
            </article>
          ))}
        </section>
    </main>
  );
}

