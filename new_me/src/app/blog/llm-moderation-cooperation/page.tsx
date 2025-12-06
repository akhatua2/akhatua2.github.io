"use client";

import BlogPostLayout from "@/components/BlogPostLayout";
import Image from "next/image";

const tocItems = [
    { id: "introduction", title: "Introduction", level: 2 },
    { id: "background", title: "Background and Motivation", level: 2 },
    { id: "game-theory", title: "Game Theory Basics", level: 3 },
    { id: "moderator", title: "Why We Need a Moderator", level: 3 },
    { id: "methods", title: "Methods", level: 2 },
    { id: "synthetic", title: "Synthetic Game Setting", level: 3 },
    { id: "realistic", title: "Realistic Game Setting", level: 3 },
    { id: "evaluation", title: "Evaluation Metrics", level: 3 },
    { id: "results", title: "Results", level: 2 },
    { id: "synthetic-results", title: "Synthetic Game Results", level: 3 },
    { id: "realistic-results", title: "Realistic Game Results", level: 3 },
    { id: "deal-results", title: "Deal or No Deal Results", level: 3 },
    { id: "discussion", title: "Discussion & Future Work", level: 2 },
    { id: "references", title: "References & Resources", level: 2 },
];

export default function BlogPost() {
  return (
    <BlogPostLayout
      title="Can Moderation Help Multi-LLM Cooperation?"
      date="Dec 15, 2024"
      readingTime="18 min read"
      summary="What happens when you add a neutral moderator to help LLMs cooperate in strategic games? Spoiler: it works way better than you'd think."
      tocItems={tocItems}
    >
            <p className="text-base leading-relaxed text-foreground mb-6">
              Large Language Models are pretty good at optimizing for themselves. But when you put multiple LLMs 
              in a strategic game together, things get messy. They can optimize for individual benefit, but they 
              struggle with cooperation and fairness when incentives don't align <a href="https://arxiv.org/abs/2305.16867" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">(Akata et al., 2023)</a>.
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              Think about it: if you're playing a game where you can either cooperate or defect, and defecting gives 
              you a better individual outcome, why would you cooperate? That's the classic Prisoner's Dilemma problem. 
              But here's the thing: <strong>cooperation and fairness are crucial in multi-agent scenarios.</strong> 
              We're moving toward a future where multi-agent systems interact with humans to perform tasks or negotiate 
              as representatives, making cooperation a crucial design objective.
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              So my collaborators Harshvardhan Agarwal, Pranava Singhal, and I asked: <strong>what if we introduce 
              a neutral LLM moderator to help agents cooperate?</strong> Can a third-party agent guide LLMs toward 
              mutually beneficial strategies, especially when individual incentives are misaligned with cooperative ones?
            </p>

            <h2 id="introduction" className="text-2xl font-bold mt-12 mb-6 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              The Research Questions
            </h2>

            <p className="text-base leading-relaxed text-foreground mb-6">
              We set out to answer two main questions:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2 text-base leading-relaxed text-foreground">
              <li><strong>RQ1: Does a moderator lead to better cooperation and fairness in outcomes?</strong> We formalize 
              fairness using game theory concepts like social optimum (maximizing the minimum utility across all agents).</li>
              <li><strong>RQ2: Do agents have a better perception of each other in a moderated conversation?</strong> 
              We measure this through social skills like trustworthiness, cooperation, communication skills, respect, and consistency.</li>
            </ul>

            <h2 id="background" className="text-2xl font-bold mt-12 mb-6 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Background and Motivation
            </h2>

            <p className="text-base leading-relaxed text-foreground mb-6">
              The behavioral patterns of LLMs can be effectively studied by constructing game scenarios with different 
              incentive structures and analyzing their choices through game theory. This gives us a mathematical framework 
              to understand when and why cooperation breaks down.
            </p>

            <h3 id="game-theory" className="text-xl font-bold mt-8 mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Game Theory Basics
            </h3>

            <p className="text-base leading-relaxed text-foreground mb-6">
              In a normal/strategic form game, <code className="bg-muted px-1.5 py-0.5 rounded text-sm">N</code> players 
              simultaneously choose from action sets. Each player's outcome is determined by a utility function. 
              <em>The simultaneity of choice is crucial since each player acts without knowing others' actions.</em>
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              For the simplest case, two players each have two actions. Their utilities are represented in a 
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">2 × 2</code> matrix where entry 
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">(i, j)</code> shows the payoffs for both players.
            </p>

            <div className="my-8">
              <Image
                src="/blog-images/moderation/demo.png"
                alt="Prisoner's Dilemma game matrix showing Nash equilibrium vs social optimum"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg border border-border"
              />
            </div>

            <p className="text-base leading-relaxed text-foreground mb-6">
              There are three key concepts we care about:
            </p>

            <div className="space-y-4 mb-6">
              <div className="border-2 border-foreground bg-background p-4 shadow-[4px_4px_0px_0px_rgb(0,0,0)]">
                <p className="text-sm font-bold text-foreground mb-2">Nash Equilibrium</p>
                <p className="text-sm text-foreground mb-0">
                  A strategy profile where no player can gain by unilaterally changing their strategy while others remain fixed. 
                  Multiple Nash equilibria can exist, but they may lead to suboptimal outcomes.
                </p>
              </div>

              <div className="border-2 border-foreground bg-background p-4 shadow-[4px_4px_0px_0px_rgb(0,0,0)]">
                <p className="text-sm font-bold text-foreground mb-2">Pareto Efficiency</p>
                <p className="text-sm text-foreground mb-0">
                  A state where it's impossible to improve one player's outcome without making another worse off 
                  <a href="https://arxiv.org/abs/1706.05125" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">(Lewis et al., 2017)</a>. 
                  While commonly used in negotiations, Pareto efficient strategies may differ from Nash equilibria.
                </p>
              </div>

              <div className="border-2 border-foreground bg-background p-4 shadow-[4px_4px_0px_0px_rgb(0,0,0)]">
                <p className="text-sm font-bold text-foreground mb-2">Social Optimum</p>
                <p className="text-sm text-foreground mb-0">
                  The strategy profile that maximizes the minimum utility across all agents, representing the fairest outcome. 
                  By definition, it is Pareto efficient. This is what we're trying to achieve.
                </p>
              </div>
            </div>

            <h3 id="moderator" className="text-xl font-bold mt-8 mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Why We Need a Moderator
            </h3>

            <p className="text-base leading-relaxed text-foreground mb-6">
              Why is it so difficult to achieve cooperative and fair outcomes? If an agent stands to improve their reward 
              by unilaterally changing their strategy, they will do so unless there's an incentive to play fair. In game theory, 
              cooperation is achieved through two key means: enforcing contracts with additional penalties/rewards, or trust and 
              mutual agreement between agents.
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              The second approach is particularly effective since both agents stand to lose if the other agent mistrusts them. 
              This is especially seen in LLMs playing multi-turn games where an agent taking an unfavorable action once causes 
              the other agent to never cooperate again <a href="https://arxiv.org/abs/2305.16867" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">(Akata et al., 2023)</a>.
            </p>

            <div className="border-2 border-foreground bg-background p-6 my-6 shadow-[4px_4px_0px_0px_rgb(0,0,0)]">
              <p className="text-xs uppercase tracking-widest text-muted mb-2 font-bold">Key Insight</p>
              <p className="text-base leading-relaxed text-foreground mb-0">
                If both agents cooperate, they can potentially maximize their cumulative reward over multiple turns, making 
                the social optimum and fairness suitable objectives for multi-agent strategy and negotiation. A neutral moderator 
                can foster trust and emphasize long-term consequences, reducing agents' incentives to deviate from the social optimum.
              </p>
            </div>

            <h2 id="methods" className="text-2xl font-bold mt-12 mb-6 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Methods
            </h2>

            <p className="text-base leading-relaxed text-foreground mb-6">
              We designed experiments to test whether a moderator improves cooperation across diverse game settings. 
              We use game theory-based payoff matrices to get comprehensive coverage of different utility structures.
            </p>

            <div className="my-8">
              <Image
                src="/blog-images/moderation/game_setup.png"
                alt="Game setup diagram showing conversation rounds and decision rounds"
                width={800}
                height={500}
                className="w-full h-auto rounded-lg border border-border"
              />
            </div>

            <h3 id="synthetic" className="text-xl font-bold mt-8 mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Synthetic Game Setting
            </h3>

            <p className="text-base leading-relaxed text-foreground mb-6">
              We tested five classic game types: Prisoner's Dilemma, Hawk-Dove, Stag Hunt, Battle of the Sexes, and Deadlock. 
              These games cover diverse incentive structures where Nash equilibrium and social optimum sometimes align and sometimes don't.
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              The experiment has two main stages:
            </p>

            <ol className="list-decimal pl-6 mb-6 space-y-3 text-base leading-relaxed text-foreground">
              <li><strong>Conversation Rounds:</strong> Agents are prompted with the game setting (utility matrix), contextual information, 
              and instructions to converse. In moderated sessions, a moderator agent is included, explicitly tasked with promoting 
              fairness and social optimum outcomes. Agents converse for <code className="bg-muted px-1.5 py-0.5 rounded text-sm">k</code> rounds.</li>
              <li><strong>Decision Rounds:</strong> After conversation, agents independently make decisions labeled "F" and "J" (to avoid 
              textual bias). Decisions are made iteratively over 10 rounds, with each agent's choice revealed after each turn. 
              Agents also qualitatively rate each other based on trust, cooperation, communication, respect, and consistency.</li>
            </ol>

            <h3 id="realistic" className="text-xl font-bold mt-8 mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Realistic Game Setting
            </h3>

            <p className="text-base leading-relaxed text-foreground mb-6">
              Existing works specify utility matrices explicitly in prompts, which is unrealistic. We created the 
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">RealisticGames2x2</code> dataset with 100 unique 
              game settings that capture real-world scenarios like military arms races, office resource allocation, 
              and environmental conservation efforts.
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              This dataset reflects real-world conditions with imperfect information and qualitative/relative ordering of outcomes, 
              making it more applicable than synthetic matrices alone.
            </p>

            <h3 id="evaluation" className="text-xl font-bold mt-8 mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Evaluation Metrics
            </h3>

            <p className="text-base leading-relaxed text-foreground mb-6">
              We define the total utility for player <code className="bg-muted px-1.5 py-0.5 rounded text-sm">P_i</code> over 
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">T</code> turns as:
            </p>

            <div className="bg-muted/30 border-2 border-foreground rounded-lg p-4 my-6 font-mono text-sm overflow-x-auto">
              <code className="text-foreground">
                U<sub>P_i</sub> = Σ<sub>k=1</sub><sup>T</sup> U<sub>P_i</sub><sup>(k)</sup>
              </code>
            </div>

            <p className="text-base leading-relaxed text-foreground mb-6">
              The <strong>social optimum</strong> objective maximizes both total scores and minimizes the difference between players:
            </p>

            <div className="bg-muted/30 border-2 border-foreground rounded-lg p-4 my-6 font-mono text-sm overflow-x-auto">
              <code className="text-foreground">
                U* = 2 min(U<sub>P_1</sub>, U<sub>P_2</sub>) = (U<sub>P_1</sub> + U<sub>P_2</sub>) - |U<sub>P_1</sub> - U<sub>P_2</sub>|
              </code>
            </div>

            <p className="text-base leading-relaxed text-foreground mb-6">
              We also measure qualitative factors: Trust (T), Cooperation (C), Communication Skills (CS), Respect (R), 
              and Consistency (S), each scored 1-10.
            </p>

            <h2 id="results" className="text-2xl font-bold mt-12 mb-6 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Results
            </h2>

            <p className="text-base leading-relaxed text-foreground mb-6">
              All experiments used <code className="bg-muted px-1.5 py-0.5 rounded text-sm">LLaMA 3.2 3B</code> and results 
              are averaged over 4 seeds to account for noise.
            </p>

            <h3 id="synthetic-results" className="text-xl font-bold mt-8 mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Synthetic Game Results
            </h3>

            <p className="text-base leading-relaxed text-foreground mb-6">
              <strong>First key finding:</strong> In game scenarios where the Nash equilibrium is distinct from the social optimum, 
              our moderator consistently improves fairness and cooperation. This includes Prisoner's Dilemma, Hawk-Dove, and Stag Hunt.
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-8">
              <div>
                <Image
                  src="/blog-images/moderation/prisonners_dilemma.png"
                  alt="Prisoner's Dilemma results showing moderator improvement"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg border border-border"
                />
              </div>
              <div>
                <Image
                  src="/blog-images/moderation/hawk_dove.png"
                  alt="Hawk-Dove results showing moderator improvement"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg border border-border"
                />
              </div>
              <div>
                <Image
                  src="/blog-images/moderation/stag_hunt.png"
                  alt="Stag Hunt results showing moderator improvement"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg border border-border"
                />
              </div>
            </div>

            <p className="text-base leading-relaxed text-foreground mb-6">
              <strong>Second key finding:</strong> In games where the Nash equilibrium coincides with the social optimum 
              (Battle of the Sexes, Deadlock), the moderator doesn't significantly improve outcomes. This makes sense: 
              agents are already individually driven toward the social optimum, so moderation can't help much.
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              These results indicate that moderation plays a critical role in fostering cooperative strategies when individual 
              rationality conflicts with collective benefit. The moderator effectively provides a neutral perspective that reminds 
              agents of the collective benefit of cooperation and encourages trust.
            </p>

            <div className="my-8">
              <Image
                src="/blog-images/moderation/synthetic_qualitative_scores.png"
                alt="Qualitative scores showing improvement across all factors with moderation"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg border border-border"
              />
            </div>

            <p className="text-base leading-relaxed text-foreground mb-6">
              Our qualitative results show consistent improvement in agents' perception of each other across all parameters 
              (trust, cooperation, communication, respect, consistency) when a moderator is present. This addresses our 
              second research question: <strong>yes, agents do have a better perception of each other in moderated conversations.</strong>
            </p>

            <h3 id="realistic-results" className="text-xl font-bold mt-8 mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Realistic Game Results
            </h3>

            <p className="text-base leading-relaxed text-foreground mb-6">
              As expected, it's more challenging for LLM agents to perform well in realistic game settings where utility 
              matrices aren't explicitly provided. Moderation generally improves scores in realistic settings, except for 
              Battle of the Sexes (which requires coordination across turns, something our current setup doesn't fully support).
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              The difference is relatively limited since real-world scenarios don't have explicit payoff matrices, making it 
              a harder problem for LLMs. But the trend is clear: moderation helps.
            </p>

            <h3 id="deal-results" className="text-xl font-bold mt-8 mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Deal or No Deal Results
            </h3>

            <p className="text-base leading-relaxed text-foreground mb-6">
              We also tested on the Deal or No Deal dataset <a href="https://arxiv.org/abs/1706.05125" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">(Lewis et al., 2017)</a>, 
              where agents split an inventory of items (books, hats, balls) with different values.
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              Most conversations resulted in either disagreements or invalid item counts, leading to zero scores. There was no 
              significant quantitative difference with a moderator. However, <strong>qualitative metrics showed consistent enhancements</strong>, 
              with the most substantial improvement in trust.
            </p>

            <div className="my-8">
              <Image
                src="/blog-images/moderation/deal_no_deal_spider_plot.png"
                alt="Deal or No Deal qualitative scores showing improvement with moderation"
                width={500}
                height={400}
                className="w-full h-auto rounded-lg border border-border"
              />
            </div>

            <h2 id="discussion" className="text-2xl font-bold mt-12 mb-6 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              Discussion & Future Work
            </h2>

            <p className="text-base leading-relaxed text-foreground mb-6">
              This study demonstrates that LLM-based moderators can improve cooperation and fairness in multi-agent games, 
              especially when individual incentives conflict with collective benefit. The development of the 
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">RealisticGames2x2</code> dataset also provides a 
              valuable resource for investigating LLM behavior in strategic interactions.
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              <strong>Limitations:</strong> Our setup focuses on two-player, two-action games. Expanding to more complex 
              games (multi-player, extensive-form, partial information) remains an open challenge. Additionally, attempts 
              to train the moderator using PPO were unsuccessful due to training instability from the probabilistic reward model.
            </p>

            <p className="text-base leading-relaxed text-foreground mb-6">
              <strong>Future Work:</strong> Extending to more complex game-theoretic settings, improving moderator training 
              with alternative methodologies, and investigating whether improvements in fairness are uniformly distributed 
              across demographic groups are all promising directions.
            </p>

            <h2 id="references" className="text-2xl font-bold mt-12 mb-6 scroll-mt-24" style={{ fontFamily: "var(--font-space)" }}>
              References & Resources
            </h2>

            <div className="bg-muted/30 border-2 border-foreground rounded-lg p-6 my-6 space-y-3 text-sm">
              <p className="text-foreground">
                <strong>Papers & Resources:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li><a href="https://arxiv.org/abs/2305.16867" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">Akata et al. (2023)</a> - Playing repeated games with Large Language Models</li>
                <li><a href="https://arxiv.org/abs/1706.05125" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">Lewis et al. (2017)</a> - Deal or No Deal? End-to-End Learning of Negotiation Dialogues</li>
                <li><a href="https://arxiv.org/abs/2309.17234" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">Abdelnabi et al. (2023)</a> - LLM-Deliberation: Evaluating LLMs with Interactive Multi-Agent Negotiation Games</li>
                <li><a href="https://arxiv.org/abs/2406.06613" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">Costarelli et al. (2024)</a> - GameBench: Evaluating Strategic Reasoning Abilities of LLM Agents</li>
                <li><a href="https://www.science.org/doi/10.1126/science.ade9097" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">Bakhtin et al. (2022)</a> - Human-level play in the game of Diplomacy</li>
                <li><a href="https://arxiv.org/abs/2305.19165" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">Gandhi et al. (2023)</a> - Strategic Reasoning with Language Models</li>
              </ul>
              <p className="text-foreground mt-4">
                <strong>Code & Dataset:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li><a href="https://github.com/akhatua2/moderating_llms" className="text-accent underline hover:no-underline" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
              </ul>
            </div>

      <p className="text-base leading-relaxed text-foreground mb-6">
        This work was done with Harshvardhan Agarwal and Pranava Singhal as part of CS329x at Stanford. 
        All authors contributed equally to this work.
      </p>
    </BlogPostLayout>
  );
}

