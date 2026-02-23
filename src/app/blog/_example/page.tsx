"use client";

import Image from "next/image";
import BlogPostLayout from "@/components/BlogPostLayout";

// Define your table of contents items
const tocItems = [
  { id: "introduction", title: "Introduction", level: 2 },
  { id: "section1", title: "Section 1", level: 2 },
  { id: "subsection1", title: "Subsection 1", level: 3 },
  { id: "section2", title: "Section 2", level: 2 },
  { id: "conclusion", title: "Conclusion", level: 2 },
];

export default function ExampleBlogPost() {
  return (
    <BlogPostLayout
      title="Your Blog Post Title"
      date="Jan 20, 2025"
      readingTime="10 min read"
      summary="A brief summary of your blog post that appears below the title."
      tocItems={tocItems}
    >
      {/* Your blog content goes here */}
      <p className="text-base leading-relaxed text-foreground mb-6">
        Your introduction paragraph here...
      </p>

      <h2
        id="introduction"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Introduction
      </h2>

      <p className="text-base leading-relaxed text-foreground mb-6">More content...</p>

      <h2
        id="section1"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Section 1
      </h2>

      <h3
        id="subsection1"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Subsection 1
      </h3>

      <p className="text-base leading-relaxed text-foreground mb-6">Subsection content...</p>

      {/* Add images */}
      <div className="my-8">
        <Image
          src="/your-image.png"
          alt="Description"
          width={800}
          height={600}
          className="w-full h-auto rounded-lg border border-border"
        />
      </div>

      {/* Add code blocks */}
      <div className="bg-muted/30 border-2 border-foreground rounded-lg p-4 my-6 font-mono text-sm overflow-x-auto">
        <code className="text-foreground">Your code here</code>
      </div>

      {/* Add callout boxes */}
      <div className="border-2 border-foreground bg-background p-6 my-6 shadow-[4px_4px_0px_0px_rgb(0,0,0)]">
        <p className="text-xs uppercase tracking-widest text-muted mb-2 font-bold">Key Insight</p>
        <p className="text-base leading-relaxed text-foreground mb-0">Your insight here...</p>
      </div>

      <h2
        id="conclusion"
        className="text-2xl font-bold mt-12 mb-6 scroll-mt-24"
        style={{ fontFamily: "var(--font-space)" }}
      >
        Conclusion
      </h2>

      <p className="text-base leading-relaxed text-foreground mb-6">Conclusion content...</p>
    </BlogPostLayout>
  );
}
