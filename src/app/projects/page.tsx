import GitHubContributions from "@/components/GitHubContributions";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Projects — Arpan Khatua",
};

export default function Projects() {
  return (
    <main>
      <Navigation />
      <div className="mx-auto flex min-h-screen max-w-[65rem] flex-col gap-8 px-6 py-14 sm:px-10 pt-20">
        <section className="fade-up flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Projects</p>
          <h1
            className="text-3xl font-semibold text-foreground"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Things I built to learn faster.
          </h1>
        </section>

        <section className="fade-up">
          <GitHubContributions username="akhatua2" />
        </section>
      </div>
    </main>
  );
}
