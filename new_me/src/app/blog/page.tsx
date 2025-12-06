import Navigation from "@/components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Blog — Arpandeep Khatua",
};

const posts = [
  {
    title: "What Actually Happens Inside LLMs When You Use RL?",
    date: "Jan 20, 2025",
    readingTime: "20 min read",
    summary: "We peeked under the hood to see how reinforcement learning changes what's going on inside language models. Spoiler: it's way cooler than we thought.",
    slug: "understanding-rl-internal-representations",
  },
  {
    title: "Can Moderation Help Multi-LLM Cooperation?",
    date: "Dec 15, 2024",
    readingTime: "18 min read",
    summary: "What happens when you add a neutral moderator to help LLMs cooperate in strategic games? Spoiler: it works way better than you'd think.",
    slug: "llm-moderation-cooperation",
  },
];

export default function Blog() {
  return (
    <main>
      <Navigation />
      <div className="mx-auto flex min-h-screen max-w-[65rem] flex-col gap-8 px-6 py-14 sm:px-10 pt-20">
        <section className="fade-up flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Blog</p>
          <h1
            className="text-3xl font-semibold text-foreground"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Notes on ML, tooling, and building.
          </h1>
        </section>

        <section className="fade-up flex flex-col gap-0">
          {posts.map((post, index) => {
            const articleContent = (
              <article
                className={`px-5 py-5 transition hover:bg-muted/20 ${post.slug ? "cursor-pointer" : ""} ${
                  index < posts.length - 1 ? "border-b border-border" : ""
                }`}
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
            );

            return post.slug ? (
              <Link key={post.title} href={`/blog/${post.slug}`} className="block">
                {articleContent}
              </Link>
            ) : (
              <div key={post.title}>
                {articleContent}
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
