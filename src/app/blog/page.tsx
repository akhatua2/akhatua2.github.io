import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Blog — Arpandeep Khatua",
};

const posts = [
  {
    title: "[SWE-Smith Multilingual] Expanding to JavaScript",
    date: "2026",
    readingTime: "External Link",
    summary:
      "We expanded SWE-Smith to JavaScript with 6,099 validated patches across 74 repositories using cloud pipelines.",
    url: "https://www.swebench.com/post-260113-swesmith-javascript.html",
    external: true,
  },
  {
    title: "Is Synthetic Data Good Enough to Train User Simulators?",
    date: "2026",
    readingTime: "External Link",
    summary:
      "We spent a month trying to make synthetic data work. Found that 'the improvements you observe on synthetic benchmarks may simply not transfer to the real users you actually want to simulate.'",
    url: "https://humanlm.stanford.edu/blog_synthetic.html",
    external: true,
  },
  {
    title: "The Curse of Coordination",
    date: "2026",
    readingTime: "External Link",
    summary:
      "We built CooperBench and found that adding agents halves success rates. The channel becomes noisy with repetition, unresponsiveness, and hallucination.",
    url: "https://cooperbench.com/blog/curse-of-coordination",
    external: true,
  },
  {
    title: "The Curious Case of Miscoordination",
    date: "2026",
    readingTime: "External Link",
    summary:
      "We gave agents git access and saw only 1-2% improvement. Tools alone don't enable collaboration without social intelligence.",
    url: "https://cooperbench.com/blog/the-curious-case-of-miscoordination",
    external: true,
  },
  {
    title: "What Actually Happens Inside LLMs When You Use RL?",
    date: "Jan 20, 2025",
    readingTime: "20 min read",
    summary:
      "We peeked under the hood to see how reinforcement learning changes what's going on inside language models. Spoiler: it's way cooler than we thought.",
    slug: "understanding-rl-internal-representations",
  },
  {
    title: "Can Moderation Help Multi-LLM Cooperation?",
    date: "Dec 15, 2024",
    readingTime: "18 min read",
    summary:
      "What happens when you add a neutral moderator to help LLMs cooperate in strategic games? Spoiler: it works way better than you'd think.",
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
                key={post.slug || index}
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
                <p className="mt-2 text-base leading-relaxed text-foreground">{post.summary}</p>
              </article>
            );

            return post.external ? (
              <a
                key={post.title}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {articleContent}
              </a>
            ) : post.slug ? (
              <Link key={post.title} href={`/blog/${post.slug}`} className="block">
                {articleContent}
              </Link>
            ) : (
              <div key={post.title}>{articleContent}</div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
