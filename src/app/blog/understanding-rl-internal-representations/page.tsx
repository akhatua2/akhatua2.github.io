"use client";

import Image from "next/image";
import BlogPostLayout from "@/components/BlogPostLayout";

const tocItems = [
  { id: "context", title: "The Context: Why This Matters", level: 2 },
  { id: "setup", title: "The Setup: Math Problems and Two Training Methods", level: 2 },
  { id: "results", title: "The Results: RL Crushes It (But Why?)", level: 2 },
  { id: "high-level", title: "High-Level Analysis: What Changed in the Weights?", level: 2 },
  { id: "l2-distance", title: "L2 Distance: How Far Did We Drift?", level: 3 },
  { id: "rank-change", title: "Rank Change: How Much Information Are We Storing?", level: 3 },
  { id: "token-level", title: "Token-Level Analysis: Where Does the Model Look?", level: 2 },
  { id: "attention-matrices", title: "Self-Attention Matrices: The Big Picture", level: 3 },
  { id: "per-token", title: "Per-Token Attention: What Gets Focused On?", level: 3 },
  { id: "entropy", title: "The Entropy Story: Exploration vs. Overconfidence", level: 2 },
  { id: "discussion", title: "Discussion & Limitations", level: 2 },
  { id: "what-means", title: "What This All Means", level: 2 },
  { id: "takeaway", title: "The Takeaway", level: 2 },
  { id: "references", title: "References & Resources", level: 2 },
];

export default function BlogPost() {
  return (
    <BlogPostLayout
      title="What Actually Happens Inside LLMs When You Use RL?"
      date="Jan 20, 2025"
      readingTime="20 min read"
      summary="We peeked under the hood to see how reinforcement learning changes what's going on inside language models. Spoiler: it's way cooler than we thought."
      tocItems={tocItems}
    >
      <p className="text-base leading-relaxed text-foreground mb-6">
        So here's the thing: everyone knows that reinforcement learning (RL) makes language models
        better at reasoning. Models like OpenAI's{" "}
        <a
          href="https://openai.com/research/o1"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          o1
        </a>{" "}
        and{" "}
        <a
          href="https://arxiv.org/abs/2501.12948"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          DeepSeek-R1
        </a>{" "}
        absolutely crush math problems after RL training. But here's what bugged me:{" "}
        <strong> what's actually happening inside the model?</strong>
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        We know RL works, but we don't really know <em>why</em> it works. Does it completely rewrite
        the model's brain? Does it just tweak a few things? Is it memorizing everything or actually
        learning to reason?
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        My collaborator Rahul and I decided to find out. We took two open-source models (Qwen3-1.7B
        and LLaMA-3.2-1B), fine-tuned them on{" "}
        <a
          href="https://arxiv.org/abs/2110.14168"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GSM8K
        </a>{" "}
        math problems using both supervised fine-tuning (SFT) and RL (specifically{" "}
        <a
          href="https://arxiv.org/abs/2402.03300"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GRPO
        </a>
        ), and then we went full detective mode on their internal representations.
      </p>

      <h2
        id="context"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        The Context: Why This Matters
      </h2>

      <p className="text-base leading-relaxed text-foreground mb-6">
        Large language models have become the foundation of modern NLP. Beyond standard pretraining,
        two main strategies have emerged to specialize them:{" "}
        <strong>supervised fine-tuning (SFT)</strong> and{" "}
        <strong>reinforcement learning (RL)</strong>. SFT uses next-token prediction from human
        demonstrations, while RL methods like RLHF optimize behavior via scalar rewards, enabling
        models to follow instructions better, reduce harmful outputs, and reason more effectively{" "}
        <a
          href="https://arxiv.org/abs/2203.02155"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          (Ouyang et al., 2022)
        </a>
        .
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        Recent RLHF-trained models have shown massive improvements. OpenAI's o1 uses RL to generate
        long latent reasoning chains before responding and achieves breakthroughs on STEM benchmarks{" "}
        <a
          href="https://openai.com/research/o1"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          (OpenAI, 2024)
        </a>
        . DeepSeek-R1 uses a critic-free RL algorithm (GRPO) from scratch without any supervised
        fine-tuning to achieve reasoning capabilities comparable to o1{" "}
        <a
          href="https://arxiv.org/abs/2501.12948"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          (DeepSeek-AI, 2025)
        </a>
        .
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        Despite these advances, the inner workings of RL fine-tuning remain opaque. Existing
        research primarily evaluates final outputs (accuracy, latency, etc.) and neglects how
        internal representations evolve. This gap is critical because RLHF algorithms typically
        include KL-divergence penalties intended to constrain drift from a base model, suggesting
        that internal structure is changing but in unclear ways.
      </p>

      <h2
        id="setup"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        The Setup: Math Problems and Two Training Methods
      </h2>

      <p className="text-base leading-relaxed text-foreground mb-6">
        We chose{" "}
        <a
          href="https://arxiv.org/abs/2110.14168"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GSM8K
        </a>{" "}
        (grade school math word problems) for a few reasons: (1) you can verify if answers are
        correct, which makes RL training straightforward, and (2) it's way easier to interpret what
        the model is doing when it's solving math vs. something subjective like human preferences.
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">We used two base models:</p>

      <ul className="list-disc pl-6 mb-6 space-y-2 text-base leading-relaxed text-foreground">
        <li>
          <strong>Qwen/Qwen3-1.7B:</strong> A 1.7B parameter model
        </li>
        <li>
          <strong>unsloth/Llama-3.2-1B-Instruct:</strong> An instruction-finetuned version of
          LLaMA-3.2-1B (we used the instruction-tuned version because the base model is poor at
          instruction following, making it hard to verify answers with GRPO)
        </li>
      </ul>

      <p className="text-base leading-relaxed text-foreground mb-6">
        We trained both models for 4 epochs using:
      </p>

      <ul className="list-disc pl-6 mb-6 space-y-2 text-base leading-relaxed text-foreground">
        <li>
          <strong>SFT (Supervised Fine-Tuning):</strong> The classic approach: just predict the next
          token from example solutions using cross-entropy loss
        </li>
        <li>
          <strong>RL with GRPO:</strong>{" "}
          <a
            href="https://arxiv.org/abs/2402.03300"
            className="text-accent underline hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Group Relative Policy Optimization
          </a>{" "}
          estimates advantages by comparing sampled outputs within a group, avoiding the need for a
          separate critic model
        </li>
        <li>
          <strong>RL with and without KL regularization:</strong> To see how much that "stay close
          to the base model" constraint matters
        </li>
      </ul>

      <p className="text-base leading-relaxed text-foreground mb-6">
        GRPO is particularly cool because it cuts memory usage roughly in half compared to PPO and
        simplifies training dynamics. Instead of training a separate value function, it estimates
        advantages by comparing outputs within a group:
      </p>

      <div className="bg-muted/30 border-2 border-foreground rounded-lg p-4 my-6 font-mono text-sm overflow-x-auto">
        <code className="text-foreground">
          A<sub>i</sub> = (R(γ<sub>i</sub>) - mean(G)) / std(G), where γ<sub>i</sub> ∈ G
        </code>
      </div>

      <p className="text-base leading-relaxed text-foreground mb-6">
        This group-based comparison aligns well with reward-based ranking and enabled
        DeepSeek-R1-Zero to learn reasoning strategies via RL alone without supervised warm-up{" "}
        <a
          href="https://arxiv.org/abs/2501.12948"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          (DeepSeek-AI, 2025)
        </a>
        .
      </p>

      <h2
        id="results"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        The Results: RL Crushes It (But Why?)
      </h2>

      <p className="text-base leading-relaxed text-foreground mb-6">
        First, the obvious stuff: <strong>RL performed way better.</strong> On Qwen, RL with KL hit
        83.55% accuracy vs. 62.70% for SFT. That's a 20% gap! On LLaMA, the gap was even bigger:
        about 24%. The base model scores were 20.77% for Qwen and 48.67% for LLaMA, so both methods
        improved things, but RL did way better.
      </p>

      {/* Results Table */}
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse border-2 border-foreground text-sm">
          <thead>
            <tr className="bg-foreground text-background">
              <th className="border border-foreground p-2 text-left">Method</th>
              <th className="border border-foreground p-2 text-center" colSpan={4}>
                Eval Score (%)
              </th>
            </tr>
            <tr className="bg-muted/30">
              <th className="border border-foreground p-2 text-left">Epoch →</th>
              <th className="border border-foreground p-2 text-center">1</th>
              <th className="border border-foreground p-2 text-center">2</th>
              <th className="border border-foreground p-2 text-center">3</th>
              <th className="border border-foreground p-2 text-center">4</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-100 dark:bg-green-900/20">
              <td className="border border-foreground p-2 font-semibold">Qwen3-1.7B RL (KL)</td>
              <td className="border border-foreground p-2 text-center">80.74</td>
              <td className="border border-foreground p-2 text-center">81.88</td>
              <td className="border border-foreground p-2 text-center font-bold">83.55</td>
              <td className="border border-foreground p-2 text-center">81.43</td>
            </tr>
            <tr className="bg-green-100 dark:bg-green-900/20">
              <td className="border border-foreground p-2 font-semibold">Qwen3-1.7B RL (no KL)</td>
              <td className="border border-foreground p-2 text-center">82.64</td>
              <td className="border border-foreground p-2 text-center">82.87</td>
              <td className="border border-foreground p-2 text-center">83.47</td>
              <td className="border border-foreground p-2 text-center">81.40</td>
            </tr>
            <tr>
              <td className="border border-foreground p-2">Qwen3-1.7B SFT</td>
              <td className="border border-foreground p-2 text-center">54.40</td>
              <td className="border border-foreground p-2 text-center">63.00</td>
              <td className="border border-foreground p-2 text-center">62.90</td>
              <td className="border border-foreground p-2 text-center">62.70</td>
            </tr>
            <tr className="bg-green-100 dark:bg-green-900/20">
              <td className="border border-foreground p-2 font-semibold">LLaMA-3.2 1B RL (KL)</td>
              <td className="border border-foreground p-2 text-center">54.36</td>
              <td className="border border-foreground p-2 text-center font-bold">58.38</td>
              <td className="border border-foreground p-2 text-center">58.30</td>
              <td className="border border-foreground p-2 text-center">58.07</td>
            </tr>
            <tr className="bg-green-100 dark:bg-green-900/20">
              <td className="border border-foreground p-2 font-semibold">
                LLaMA-3.2 1B RL (no KL)
              </td>
              <td className="border border-foreground p-2 text-center">28.35</td>
              <td className="border border-foreground p-2 text-center">50.11</td>
              <td className="border border-foreground p-2 text-center">38.89</td>
              <td className="border border-foreground p-2 text-center">51.10</td>
            </tr>
            <tr>
              <td className="border border-foreground p-2">LLaMA-3.2 1B SFT</td>
              <td className="border border-foreground p-2 text-center">26.99</td>
              <td className="border border-foreground p-2 text-center">32.15</td>
              <td className="border border-foreground p-2 text-center">34.80</td>
              <td className="border border-foreground p-2 text-center">35.63</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-muted mt-2 text-center">
          Base model scores: Qwen = 20.77%, LLaMA = 48.67%. Green rows = RL methods.
        </p>
      </div>

      <p className="text-base leading-relaxed text-foreground mb-6">
        RL models also generated longer completions, often using the full 512-token budget. At
        first, I thought this was wasteful, but it turns out they're being thorough: exploring
        different solution paths and then confidently landing on the answer. This is a phenomenon
        that's been observed before in the{" "}
        <a
          href="https://arxiv.org/abs/2501.12948"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          DeepSeek-R1 paper
        </a>
        : GRPO incentivizes exploration, which often leads to longer and better answers.
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        For Qwen, training with and without KL-divergence resulted in no distinguishable difference
        in final performance. For LLaMA, training with KL-divergence led to better results (~7%
        gap). Interestingly, for LLaMA-3.2 1B, SFT actually made the model worse than the base. This
        is likely because the base model itself has been fine-tuned for a long duration.
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        But here's where it gets interesting: when we looked at what changed inside the models, RL
        barely moved anything. SFT, on the other hand, went wild.
      </p>

      <h2
        id="high-level"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        High-Level Analysis: What Changed in the Weights?
      </h2>

      <h3
        id="l2-distance"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        L2 Distance: How Far Did We Drift?
      </h3>

      <p className="text-base leading-relaxed text-foreground mb-6">
        We measured how far the fine-tuned weights drifted from the base model using L2 (Frobenius)
        distance. The results were shocking:
      </p>

      <div className="my-8">
        <Image
          src="/blog-images/proj_combined_noset_all.png"
          alt="L2 distance comparison showing RL stays closer to base model"
          width={800}
          height={600}
          className="w-full h-auto rounded-lg border border-border"
        />
      </div>

      <p className="text-base leading-relaxed text-foreground mb-6">
        <strong>SFT caused massive drift.</strong> The weights moved way further from the original
        model.
        <strong> RL models stayed surprisingly close to the base.</strong> Even more interesting: RL
        with KL regularization stayed even closer, but RL without KL still did way better than SFT
        while staying closer to the base.
      </p>

      <h3
        id="rank-change"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Rank Change: How Much Information Are We Storing?
      </h3>

      <p className="text-base leading-relaxed text-foreground mb-6">
        We also looked at the "rank" of the weight matrices (how much information they store). A
        higher rank means more "information", whereas a lower rank means the matrix stores less
        "information" since it can be decomposed into a smaller one with only minor loss.
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        To measure this, we first found the rank (K) of the base model weight which accounts for 99%
        of information using SVD. For example, for a Q (query) matrix (2048 x 2048), K might be
        2000. We then found out how much information the same K top eigenvalues preserve in the
        fine-tuned (RL/SFT) weights and subtracted the two values. A negative value means the rank
        increased during training (the same vectors now hold less information than they did
        previously).
      </p>

      <div className="my-8">
        <Image
          src="/blog-images/combined_info_inc_all.png"
          alt="Rank comparison showing SFT increases rank while RL preserves it"
          width={800}
          height={600}
          className="w-full h-auto rounded-lg border border-border"
        />
      </div>

      <p className="text-base leading-relaxed text-foreground mb-6">
        <strong>SFT training led to weights with higher rank than the base models.</strong> RL
        models preserved or even reduced the rank. This suggests SFT is memorizing more information,
        while RL is learning more general patterns.
      </p>

      <div className="border-2 border-foreground bg-muted/10 p-6 my-6">
        <p className="text-base leading-relaxed text-foreground mb-0 italic">
          Think of it like this: imagine you're teaching someone to add numbers. SFT is like making
          them memorize "2+2=4, 4+4=8, 8+10=18..." for every possible combination. RL is like
          teaching them the general concept of addition so they can figure out any problem. The
          first approach needs way more storage (higher rank), but the second generalizes better.
        </p>
      </div>

      <div className="border-2 border-foreground bg-background p-6 my-6 shadow-[4px_4px_0px_0px_rgb(0,0,0)]">
        <p className="text-xs uppercase tracking-widest text-muted mb-2 font-bold">Key Insight</p>
        <p className="text-base leading-relaxed text-foreground mb-0">
          Base models already have the reasoning ability to solve these problems. They have the
          circuits and knowledge built in. RL just gives them a gentle nudge in the right direction,
          activating the specific circuits/weights that matter. SFT, on the other hand, tries to
          hardcode everything.
        </p>
      </div>

      <h2
        id="token-level"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Token-Level Analysis: Where Does the Model Look?
      </h2>

      <h3
        id="attention-matrices"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Self-Attention Matrices: The Big Picture
      </h3>

      <p className="text-base leading-relaxed text-foreground mb-6">
        We plotted the difference between the self-attention matrix of the fine-tuned model (RL/SFT)
        and the base model for a particular prompt. Similar to the weight analysis, both the
        self-attention pattern and the scores remained much closer in "RL vs. Pre" than in "SFT vs.
        Pre".
      </p>

      <div className="border-2 border-foreground bg-background p-6 my-6 shadow-[4px_4px_0px_0px_rgb(0,0,0)]">
        <p className="text-xs uppercase tracking-widest text-muted mb-2 font-bold">
          Important Note
        </p>
        <p className="text-base leading-relaxed text-foreground mb-0">
          The scales for "SFT vs. Pre" have a much higher range (0.1 to -0.1) than the scales for
          the RL rows. So visually it might look like "RL vs. Pre" has similar differences, but it's
          not the case. SFT causes way bigger changes.
        </p>
      </div>

      <p className="text-base leading-relaxed text-foreground mb-6">
        Interestingly, the difference between KL and no KL is more prominent here (especially in
        LLaMA), where self-attention scores of models trained with KL, as expected, remain closer to
        the base model.
      </p>

      <h3
        id="per-token"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Per-Token Attention: What Gets Focused On?
      </h3>

      <p className="text-base leading-relaxed text-foreground mb-6">
        We visualized the difference in attention received by each token in the prompt between the
        base and fine-tuned models. For a given self-attention matrix{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
          A ∈ ℝ<sup>N×N</sup>
        </code>
        , where{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
          A<sub>ij</sub>
        </code>{" "}
        represents the attention paid by token{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">i</code> to token{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">j</code>, we computed the total
        attention received by each token{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">j</code> as the column-wise sum{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
          s<sub>j</sub> = Σ<sub>i=1</sub>
          <sup>N</sup> A<sub>ij</sub>
        </code>
        . To mitigate the influence of the first token (which often acts as an attention sink{" "}
        <a
          href="https://arxiv.org/abs/2504.02732"
          className="text-accent underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          (Barbero et al., 2025)
        </a>
        ), we discarded{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
          s<sub>1</sub>
        </code>{" "}
        and normalized the remaining vector.
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        <strong>One observation that remains consistent across models and examples:</strong> RL pays
        much more attention to the formatting token (
        <code className="bg-muted px-1.5 py-0.5 rounded">\boxed{}</code>) than SFT. In fact, SFT
        pays less attention to it than even the base trained model (after normalization). This is
        likely due to two reasons:
      </p>

      <ol className="list-decimal pl-6 mb-6 space-y-2 text-base leading-relaxed text-foreground">
        <li>
          For GRPO, the reward strictly depends on the right answer being within{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">\boxed{}</code>, so the model tries to
          always output it and also outputs it multiple times (often repeating the answer)
        </li>
        <li>
          Given what we know from other results (e.g., small L2 difference) and our hypothesis that
          RL-trained models only slightly nudge the model in the right direction, the per-token
          attention pattern means that RL pays more attention to just a few tokens, and these tokens
          are sufficient for improving performance
        </li>
      </ol>

      <p className="text-base leading-relaxed text-foreground mb-6">
        Another observation that supports this: if you look at the attention difference in tokens
        which make up the actual contents of the math problem (e.g., "Grace weights 25 pounds, Alex
        weights 2 pounds less than 4 times..."), you see that the difference between RL and the base
        model ("Pre") is small (smaller than between SFT and base). Ideally, you'd expect that since
        the RL model performs much better than the base, it either pays more attention or uses a
        different pattern of attention to these "logical tokens", but this is not the case. This is
        another observation supporting the theory that base models often contain the
        circuits/knowledge to solve these problems and RL only slightly nudges them in the correct
        direction.
      </p>

      <h2
        id="entropy"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        The Entropy Story: Exploration vs. Overconfidence
      </h2>

      <p className="text-base leading-relaxed text-foreground mb-6">
        This was my favorite finding. We tracked the "entropy" (uncertainty) of the model as it
        generates each token. High entropy = the model is exploring, low entropy = it's confident.
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        More specifically, e<sub>t</sub> is calculated as:
      </p>

      <div className="bg-muted/30 border-2 border-foreground rounded-lg p-4 my-6 font-mono text-sm overflow-x-auto">
        <code className="text-foreground">
          e<sub>t</sub> = Σ<sub>v=1</sub>
          <sup>V</sup> p<sub>t,v</sub> log p<sub>t,v</sub>
        </code>
      </div>

      <p className="text-base leading-relaxed text-foreground mb-6">
        where{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
          p<sub>t,v</sub>
        </code>{" "}
        is the softmax probability of the{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">v</code>-th vocabulary word for the{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">t</code>-th token. A flatter, more
        uniform distribution means a higher negative value of{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
          e<sub>t</sub>
        </code>
        . A sharper peaked distribution (where only one word/token is highly probable) means{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
          e<sub>t</sub>
        </code>
        will be closer to 0.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div>
          <Image
            src="/blog-images/rl_2.png"
            alt="RL model output with entropy overlay"
            width={400}
            height={300}
            className="w-full h-auto rounded-lg border border-border mb-4"
          />
          <Image
            src="/blog-images/rl_2_plot.png"
            alt="RL entropy plot showing exploration then confidence"
            width={400}
            height={300}
            className="w-full h-auto rounded-lg border border-border"
          />
          <p className="text-sm text-muted mt-2 text-center">
            RL: Explores broadly, then gets confident
          </p>
        </div>
        <div>
          <Image
            src="/blog-images/sft_2.png"
            alt="SFT model output with entropy overlay"
            width={400}
            height={300}
            className="w-full h-auto rounded-lg border border-border mb-4"
          />
          <Image
            src="/blog-images/sft_2_plot.png"
            alt="SFT entropy plot showing early overconfidence"
            width={400}
            height={300}
            className="w-full h-auto rounded-lg border border-border"
          />
          <p className="text-sm text-muted mt-2 text-center">
            SFT: Overconfident early, then uncertain
          </p>
        </div>
      </div>

      <p className="text-base leading-relaxed text-foreground mb-6">
        There are two key things we observe:
      </p>

      <ol className="list-decimal pl-6 mb-6 space-y-2 text-base leading-relaxed text-foreground">
        <li>
          <strong>RL-trained models are more exploratory in the initial phase</strong> (they have
          higher negative values) while SFT models start out being much more confident. This is due
          to the fundamental difference in how RL and SFT work: RL encourages exploration of
          different paths during training and rewards all paths that lead to correct answers, while
          SFT forces the model to collapse to one mode.
        </li>
        <li>
          <strong>
            As RL models get closer to the answer, they gradually become more confident
          </strong>{" "}
          (the line gets closer to 0 and flatter). On the other hand, for SFT models, there's a dip
          in confidence just before they answer. For harder tasks, having higher entropy (larger
          negative values of e_t) becomes important since it helps the model explore and backtrack
          during inference to come to the correct solution. RL helping the model avoid a
          mode/entropy collapse is likely one of the most important reasons why RL-trained models
          are much better at harder tasks.
        </li>
      </ol>

      <h2
        id="discussion"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Discussion & Limitations
      </h2>

      <p className="text-base leading-relaxed text-foreground mb-6">
        Our study focuses on two open-source models and a single math benchmark, which may limit
        generalization to other domains or model scales. While our structural analyses provide clear
        trends, they do not capture all possible forms of internal drift. Future work could expand
        to additional architectures, tasks, and interpretability tools for broader validation.
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        A broader impact of the project is that most RL research usually focuses on better
        algorithms, evaluations, and environments. Our project moves in a different direction and
        helps us understand <em>why</em> RL works.
      </p>

      <h2
        id="what-means"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        What This All Means
      </h2>

      <p className="text-base leading-relaxed text-foreground mb-6">So here's the big picture:</p>

      <ul className="list-disc pl-6 mb-6 space-y-2 text-base leading-relaxed text-foreground">
        <li>
          <strong>RL doesn't rewrite the model.</strong> It makes small, targeted changes that
          preserve the base model's reasoning abilities.
        </li>
        <li>
          <strong>SFT memorizes.</strong> It stores more information (higher rank) but doesn't
          generalize as well.
        </li>
        <li>
          <strong>RL encourages exploration.</strong> Models stay uncertain longer, try different
          paths, and then confidently commit to answers.
        </li>
        <li>
          <strong>Base models already know how to reason.</strong> RL just activates the right
          circuits and sharpens focus on what matters.
        </li>
        <li>
          <strong>RL preserves attention structure.</strong> Especially with KL regularization,
          attention patterns stay close to the base model.
        </li>
        <li>
          <strong>RL focuses on key tokens.</strong> It pays more attention to formatting tokens
          like <code className="bg-muted px-1.5 py-0.5 rounded">\boxed{}</code> without needing to
          change attention to problem content.
        </li>
      </ul>

      <p className="text-base leading-relaxed text-foreground mb-6">
        This has huge implications for alignment and interpretability. If RL makes small,
        interpretable changes rather than massive rewrites, we can better understand and control
        what models are doing. We can design training that preserves the good stuff while fixing the
        bad stuff.
      </p>

      <h2
        id="takeaway"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        The Takeaway
      </h2>

      <p className="text-base leading-relaxed text-foreground mb-6">
        RL fine-tuning is like a precision tool: it makes surgical changes rather than swinging a
        sledgehammer. It nudges models in the right direction without breaking what already works.
        And that's probably why it's so effective at improving reasoning while maintaining
        generalization.
      </p>

      <p className="text-base leading-relaxed text-foreground mb-6">
        These results suggest that RL fine-tuning encourages efficient and selective adaptation,
        while SFT drives more global but less structured changes. Understanding these internal
        differences is key to designing future alignment strategies that balance performance with
        interpretability.
      </p>

      <h2
        id="references"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        References & Resources
      </h2>

      <div className="bg-muted/30 border-2 border-foreground rounded-lg p-6 my-6 space-y-3 text-sm">
        <p className="text-foreground">
          <strong>Papers & Resources:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>
            <a
              href="https://arxiv.org/abs/2203.02155"
              className="text-accent underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ouyang et al. (2022)
            </a>{" "}
            - Training language models to follow instructions with human feedback
          </li>
          <li>
            <a
              href="https://arxiv.org/abs/2402.03300"
              className="text-accent underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shao et al. (2024)
            </a>{" "}
            - DeepSeekMath: Pushing the Limits of Mathematical Reasoning (GRPO)
          </li>
          <li>
            <a
              href="https://arxiv.org/abs/2501.12948"
              className="text-accent underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              DeepSeek-AI (2025)
            </a>{" "}
            - DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning
          </li>
          <li>
            <a
              href="https://arxiv.org/abs/2110.14168"
              className="text-accent underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cobbe et al. (2021)
            </a>{" "}
            - Training Verifiers to Solve Math Word Problems (GSM8K)
          </li>
          <li>
            <a
              href="https://arxiv.org/abs/2504.02732"
              className="text-accent underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Barbero et al. (2025)
            </a>{" "}
            - Why do LLMs attend to the first token?
          </li>
          <li>
            <a
              href="https://openai.com/research/o1"
              className="text-accent underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI (2024)
            </a>{" "}
            - o1 System Card
          </li>
        </ul>
        <p className="text-foreground mt-4">
          <strong>Code & Plots:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 text-foreground">
          <li>
            <a
              href="https://github.com/akhatua2/ExplAIn"
              className="text-accent underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </li>
          <li>
            <a
              href="https://drive.google.com/drive/folders/1DyUjeoGDkSYOxZv4yXRnpFp5MkLJldP0"
              className="text-accent underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Full Plots & Visualizations
            </a>
          </li>
        </ul>
      </div>

      <p className="text-base leading-relaxed text-foreground mb-6">
        This work was done with Rahul Chand as part of CS224R at Stanford. Shoutout to the
        open-source community for making models like Qwen and LLaMA available for research!
      </p>
    </BlogPostLayout>
  );
}
