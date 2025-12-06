#!/usr/bin/env tsx
/**
 * Build-time search index generator (TypeScript).
 * Scans blog posts and selected static pages, extracts text, and writes public/search-index.json.
 */

import fs from "fs";
import path from "path";

type Section = {
  id: string;
  title: string;
  content: string;
  level: number; // 2 for h2, 3 for h3
  parentId?: string; // For h3 sections, link to parent h2
};

type SearchEntry = {
  title: string;
  url: string;
  description?: string;
  category: "Blog" | "Page" | "Research";
  content?: string;
  sections?: Section[]; // For blog posts with sections
};

const ROOT = path.join(__dirname, "..");
const APP_DIR = path.join(ROOT, "src", "app");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUTPUT_FILE = path.join(PUBLIC_DIR, "search-index.json");
const BLOG_DIR = path.join(APP_DIR, "blog");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readFileSafe(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function truncate(text: string, max = 800): string {
  return text.length > max ? text.slice(0, max) + "..." : text;
}

function extractTitle(source: string): string {
  // Extract from BlogPostLayout title prop
  const blogTitleMatch = source.match(/title\s*=\s*"([^"]+)"/);
  if (blogTitleMatch) return blogTitleMatch[1];
  // Extract from metadata title
  const metaTitleMatch = source.match(/title:\s*"([^"]+)"/);
  if (metaTitleMatch) return metaTitleMatch[1];
  return "Untitled";
}

function extractSummary(source: string): string {
  // Extract summary from BlogPostLayout summary prop
  const summaryMatch = source.match(/summary\s*=\s*"([^"]+)"/);
  if (summaryMatch) return summaryMatch[1];
  return "";
}

function extractJSXText(source: string): string {
  // Step 1: Remove code structure (imports, function definitions, etc.)
  let content = source
    .replace(/^"use client";?\s*/gm, "")
    .replace(/^import\s+.*?from\s+["'].*?["'];?\s*/gm, "")
    .replace(/^const\s+\w+\s*=\s*\[[\s\S]*?\];?\s*/gm, "")
    .replace(/^export\s+default\s+function\s+\w+\(\)\s*\{/m, "")
    .replace(/^return\s*\(/m, "")
    .replace(/^\);?\s*\}$/m, "");

  // Step 2: Extract text content from JSX string literals
  // Match text in quotes that appears to be content (not attributes)
  const textMatches: string[] = [];
  
  // Extract text from JSX children: content between > and <
  // Pattern: >text content here<
  const jsxContentRegex = />([^<>{]+)</g;
  let match;
  while ((match = jsxContentRegex.exec(content)) !== null) {
    let text = match[1].trim();
    // Skip if it's code/attributes or doesn't look like readable text
    if (text && 
        text.length > 3 && 
        !text.match(/^(className|style|id|href|src|alt|target|rel|onClick|onMouseEnter|onMouseLeave|useEffect|useState|window\.|set\w+|const|let|var|function|return|if|for|while|\.map|\.filter|=>|=|{|}|\(|\)|\[|\])/) &&
        // Must contain actual words (at least 4 consecutive letters)
        /[a-zA-Z]{4,}/.test(text) &&
        // Must not be mostly code patterns
        !text.match(/^[^a-zA-Z]*$/) &&
        // Must not contain too many code-like patterns
        (text.match(/[a-zA-Z]/g)?.length || 0) > (text.match(/[=<>!&|+\-*/%(){}[\]]/g)?.length || 0) &&
        // Skip code fragments: variable.property, ternary operators, etc.
        !text.match(/\b(post|item|index|key|href|slug|result|entry|section|Link|Button|div|span|p|h1|h2|h3|h4|h5|h6)\.\w+\s*\?/) &&
        !text.match(/\?\s*\(/) &&
        !text.match(/:\s*\(/) &&
        !text.match(/\b(Link|key|href|post|slug|index|item|result|entry|section)\s*\??\s*[=:\(]/i)) {
      textMatches.push(text);
    }
  }

  // Extract longer string literals that look like content
  const stringLiteralRegex = /"([^"]{30,})"/g;
  while ((match = stringLiteralRegex.exec(content)) !== null) {
    const text = match[1].trim();
    // Skip URLs, paths, and code-like strings
    if (!text.match(/^(https?:\/\/|\/|\.\/|className|id=|src=|alt=|href=|style=|onClick|useEffect|window\.|const|let|var|function|return)/i) && 
        text.length > 30 &&
        /[a-zA-Z]{4,}/.test(text)) { // Must contain actual words
      textMatches.push(text);
    }
  }

  // Step 3: Clean up extracted text
  let extracted = textMatches
    .join(" ")
    // Remove JSX expressions and code patterns
    .replace(/\{[^}]*\}/g, " ")
    .replace(/className\s*=\s*"[^"]*"/g, " ")
    .replace(/style\s*=\s*\{[^}]*\}/g, " ")
    .replace(/id\s*=\s*"[^"]*"/g, " ")
    .replace(/href\s*=\s*"[^"]*"/g, " ")
    .replace(/src\s*=\s*"[^"]*"/g, " ")
    .replace(/alt\s*=\s*"[^"]*"/g, " ")
    .replace(/onClick\s*=\s*\{[^}]*\}/g, " ")
    .replace(/onMouseEnter\s*=\s*\{[^}]*\}/g, " ")
    .replace(/onMouseLeave\s*=\s*\{[^}]*\}/g, " ")
    .replace(/useEffect\s*\([^)]*\)\s*\{[^}]*\}/g, " ")
    .replace(/useState\s*\([^)]*\)/g, " ")
    .replace(/window\.\w+\s*\([^)]*\)/g, " ")
    .replace(/set\w+\s*\([^)]*\)/g, " ")
    .replace(/const\s+\w+\s*=\s*[^;]+;/g, " ")
    .replace(/let\s+\w+\s*=\s*[^;]+;/g, " ")
    .replace(/var\s+\w+\s*=\s*[^;]+;/g, " ")
    .replace(/function\s+\w+\s*\([^)]*\)\s*\{[^}]*\}/g, " ")
    .replace(/=>\s*\{[^}]*\}/g, " ")
    .replace(/return\s+[^;]+;/g, " ")
    .replace(/if\s*\([^)]*\)\s*\{[^}]*\}/g, " ")
    .replace(/for\s*\([^)]*\)\s*\{[^}]*\}/g, " ")
    .replace(/while\s*\([^)]*\)\s*\{[^}]*\}/g, " ")
    .replace(/\.map\s*\([^)]*\)/g, " ")
    .replace(/\.filter\s*\([^)]*\)/g, " ")
    // Remove HTML/JSX tags
    .replace(/<[^>]+>/g, " ")
    // Remove code patterns
    .replace(/\/\/.*$/gm, " ")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    // Remove Tailwind/CSS class patterns (text-2xl, font-bold, mt-12, etc.)
    .replace(/\b(text|font|mt|mb|px|py|bg|border|rounded|shadow|flex|grid|items|justify|gap|space|w|h|max|min|object|overflow|leading|tracking|uppercase|lowercase|capitalize|hidden|block|inline|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|base|sm|xs|muted|foreground|background|accent|scroll)\S*/g, " ")
    // Remove common JSX patterns
    .replace(/\b(className|style|id|href|src|alt|target|rel|onClick|onMouseEnter|onMouseLeave|useEffect|useState|window|set\w+|const|let|var|function|return|if|for|while|map|filter|ul|li|div|span|p|h1|h2|h3|h4|h5|h6|a|img|svg|path|circle|rect|g|defs|clipPath|linearGradient|stop)\b/gi, " ")
    // Remove code fragments: variable.property patterns, ternary operators, etc.
    .replace(/\b\w+\.\w+\s*\?/g, " ") // post.slug ? patterns
    .replace(/\?\s*\(/g, " ") // ? ( patterns
    .replace(/:\s*\(/g, " ") // : ( patterns
    .replace(/\b(Link|key|href|post|slug|index|item|result|entry|section)\s*\??\s*[=:\(]/gi, " ") // Code variable patterns
    .replace(/\b(post|item|index|key|href|slug|result|entry|section|Link|Button|div|span|p|h1|h2|h3|h4|h5|h6)\s*\.\s*\w+/gi, " ") // object.property patterns
    .replace(/\b\w+\s*\?\s*\w+/g, " ") // ternary operator patterns
    .replace(/\b\w+\s*:\s*\w+/g, " ") // object property patterns
    .replace(/\(\s*\w+\s*\)/g, " ") // function call patterns
    .replace(/\b\w+\s*\(/g, " ") // function name patterns
    // Remove standalone code words that don't make sense in context
    .replace(/\b(post\.slug|post\.|item\.|index\.|key\s*=|href\s*=|slug\s*=|result\.|entry\.|section\.|Link\s*\(|Button\s*\(|div\s*\(|span\s*\(|p\s*\(|h1\s*\(|h2\s*\(|h3\s*\(|h4\s*\(|h5\s*\(|h6\s*\()/gi, " ")
    // Remove fragments that are clearly code
    .replace(/\b(post|item|index|key|href|slug|result|entry|section|Link|Button|div|span|p|h1|h2|h3|h4|h5|h6|map|filter|forEach|reduce|find|some|every|includes|split|join|replace|trim|toLowerCase|toUpperCase|push|pop|shift|unshift|slice|splice|concat|sort|reverse|indexOf|lastIndexOf|substring|substr|charAt|charCodeAt|fromCharCode|match|search|replace|exec|test|toString|valueOf|hasOwnProperty|isPrototypeOf|propertyIsEnumerable|toLocaleString|toJSON|parse|stringify|keys|values|entries|assign|create|defineProperty|defineProperties|getOwnPropertyDescriptor|getOwnPropertyNames|getOwnPropertySymbols|getPrototypeOf|setPrototypeOf|is|seal|freeze|preventExtensions|isExtensible|isSealed|isFrozen|hasOwn|get|set|delete|has|clear|size|forEach|keys|values|entries|Symbol|iterator|toStringTag|hasInstance|isConcatSpreadable|match|replace|search|split|species|toPrimitive|unscopables)\b(?=\s*[=:\(\.\?])/gi, " ") // Only if followed by code operators
    // Decode HTML entities
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    // Remove excessive punctuation and special chars (keep basic punctuation)
    .replace(/[^\w\s.,!?;:'"()\-]/g, " ")
    // Remove remaining code fragments (standalone code words/phrases)
    .replace(/\b(post\.slug|post\.|item\.|index\.|key\s*=|href\s*=|slug\s*=|result\.|entry\.|section\.|Link\s*\(|Button\s*\(|div\s*\(|span\s*\(|p\s*\(|h1\s*\(|h2\s*\(|h3\s*\(|h4\s*\(|h5\s*\(|h6\s*\()/gi, " ")
    .replace(/\b(post|item|index|key|href|slug|result|entry|section|Link|Button|div|span|p|h1|h2|h3|h4|h5|h6)\s+[=:\(\.\?]/gi, " ")
    .replace(/\s+[=:\(\)\.\?]\s+/g, " ") // Remove standalone operators
    .replace(/\b\w+\s*[=:\(\)\.\?]\s*\w+\s*[=:\(\)\.\?]/g, " ") // Remove code-like patterns
    // Remove fragments that are just punctuation + code words
    .replace(/,\s*;\s*\b(Link|key|href|post|slug|index|item|result|entry|section|Button|div|span|p|h1|h2|h3|h4|h5|h6)\b/gi, " ")
    .replace(/,\s*;\s*\w+/g, " ") // Remove ", ; word" patterns
    .replace(/\b(Link|key|href|post|slug|index|item|result|entry|section|Button|div|span|p|h1|h2|h3|h4|h5|h6)\b(?=\s*$)/gi, " ") // Remove standalone code words at end
    .replace(/\b(Link|key|href|post|slug|index|item|result|entry|section|Button|div|span|p|h1|h2|h3|h4|h5|h6)\b(?=\s*[,;])/gi, " ") // Remove code words before punctuation
    // Remove code fragments: ); patterns, function calls, etc.
    .replace(/\)\s*;\s*\w+/g, " ") // Remove "); word" patterns
    .replace(/\(\s*\(\)/g, " ") // Remove "(())" patterns
    .replace(/\(\s*\)/g, " ") // Remove "()" patterns
    .replace(/\b\w+\s*,\s*;\s*\(/g, " ") // Remove "word, ; (" patterns
    .replace(/\b(showRealImage|setShowRealImage|updateHeight|setWindowHeight|window|addEventListener|removeEventListener|useEffect|useState)\b/gi, " ") // Remove React/JS patterns
    .replace(/;\s*\(/g, " ") // Remove "; (" patterns
    .replace(/\)\s*;/g, " ") // Remove ");" patterns
    .replace(/\(\s*\(/g, " ") // Remove "((" patterns
    .replace(/\)\s*\)/g, " ") // Remove "))" patterns
    .replace(/,\s*\)/g, " ") // Remove ",)" patterns
    .replace(/\(\s*,/g, " ") // Remove "(," patterns
    // Remove standalone punctuation fragments
    .replace(/,\s*;\s*;\s*;\s*,/g, " ") // Remove ", ; ; ; ," patterns
    .replace(/,\s*;\s*;/g, " ") // Remove ", ; ;" patterns
    .replace(/,\s*;/g, " ") // Remove ", ;" patterns
    .replace(/;\s*;/g, " ") // Remove "; ;" patterns
    .replace(/,\s*,/g, " ") // Remove ", ," patterns
    // Remove fragments that are just punctuation
    .replace(/^\s*[,;]\s*$/gm, " ")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim();

  // Deduplicate: remove repeated phrases (common in extracted JSX)
  const sentences = extracted.split(/[.!?]\s+/);
  const uniqueSentences: string[] = [];
  const seen = new Set<string>();
  for (const sentence of sentences) {
    const normalized = sentence.trim().toLowerCase();
    if (normalized && normalized.length > 10 && !seen.has(normalized)) {
      seen.add(normalized);
      uniqueSentences.push(sentence.trim());
    }
  }
  extracted = uniqueSentences.join(". ").trim();

  return extracted;
}

function extractDescription(source: string, extractedText: string): string {
  // First try to get summary prop
  const summary = extractSummary(source);
  if (summary) return summary;
  
  // Otherwise use first couple sentences from extracted text
  if (!extractedText) return "";
  // Find first two sentences by looking for sentence-ending punctuation
  const match = extractedText.match(/^([^.!?]*[.!?]\s*[^.!?]*[.!?]?)/);
  if (match) {
    return truncate(match[1].trim(), 220);
  }
  // Fallback: just take first 220 chars
  return truncate(extractedText, 220);
}

function extractSections(source: string): Section[] {
  const sections: Section[] = [];
  
  // Extract h2 and h3 headings with their IDs
  // Pattern: <h2 id="section-id" ...>Title</h2> or <h3 id="section-id" ...>Title</h3>
  const headingRegex = /<(h[23])\s+id\s*=\s*"([^"]+)"[^>]*>\s*([^<]+)\s*<\/h[23]>/gi;
  const headings: Array<{ level: number; id: string; title: string; index: number }> = [];
  
  let match;
  while ((match = headingRegex.exec(source)) !== null) {
    const level = match[1] === "h2" ? 2 : 3;
    const id = match[2];
    const title = match[3].trim();
    headings.push({ level, id, title, index: match.index });
  }
  
  if (headings.length === 0) return sections;
  
  // Extract content between headings
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const nextIndex = i < headings.length - 1 ? headings[i + 1].index : source.length;
    
    // Extract content between this heading and the next
    const sectionContent = source.substring(heading.index, nextIndex);
    const textContent = extractJSXText(sectionContent);
    
    // Find parent h2 for h3 sections
    let parentId: string | undefined;
    if (heading.level === 3) {
      // Find the most recent h2 before this h3
      for (let j = i - 1; j >= 0; j--) {
        if (headings[j].level === 2) {
          parentId = headings[j].id;
          break;
        }
      }
    }
    
    if (textContent.trim().length > 20) {
      sections.push({
        id: heading.id,
        title: heading.title,
        content: truncate(textContent, 1000),
        level: heading.level,
        parentId,
      });
    }
  }
  
  return sections;
}

function blogUrlFromPath(filePath: string): string {
  const parts = filePath.split(path.sep);
  const idx = parts.lastIndexOf("blog");
  if (idx >= 0 && parts[idx + 1]) {
    const slug = parts[idx + 1];
    return `/blog/${slug}`;
  }
  return "/blog";
}

function collectBlogPosts(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  if (!fs.existsSync(BLOG_DIR)) return entries;
  const items = fs.readdirSync(BLOG_DIR);
  for (const item of items) {
    // Skip example/template directories (those starting with _)
    if (item.startsWith("_")) continue;
    
    const p = path.join(BLOG_DIR, item);
    const pageFile = path.join(p, "page.tsx");
    if (fs.existsSync(pageFile) && fs.lstatSync(pageFile).isFile()) {
      const raw = readFileSafe(pageFile);
      const title = extractTitle(raw);
      const content = extractJSXText(raw);
      const description = extractDescription(raw, content);
      const sections = extractSections(raw);
      
      entries.push({
        title,
        url: blogUrlFromPath(pageFile),
        description,
        category: "Blog",
        content: truncate(content, 4000),
        sections: sections.length > 0 ? sections : undefined,
      });
    }
  }
  return entries;
}

function extractPapersFromNewspaper(): SearchEntry[] {
  const newspaperFile = path.join(ROOT, "src", "components", "Newspaper.tsx");
  const raw = readFileSafe(newspaperFile);
  if (!raw) return [];

  const entries: SearchEntry[] = [];
  
  // Extract the newsItems array - look for the array definition
  // Pattern: const newsItems = [ ... ];
  const arrayStart = raw.indexOf("const newsItems = [");
  if (arrayStart === -1) return entries;

  // Find the matching closing bracket
  let bracketCount = 0;
  let inString = false;
  let stringChar = '';
  let i = arrayStart + "const newsItems = [".length;
  
  for (; i < raw.length; i++) {
    const char = raw[i];
    
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && raw[i - 1] !== '\\') {
      inString = false;
    } else if (!inString) {
      if (char === '[') bracketCount++;
      else if (char === ']') {
        if (bracketCount === 0) break;
        bracketCount--;
      }
    }
  }

  const arrayContent = raw.substring(arrayStart, i + 1);
  
  // Extract individual paper objects using regex
  // Pattern: { ... headline: "...", content: "...", authors: "...", paperTitle: "...", venue: "...", ... }
  const paperRegex = /\{\s*date:\s*"([^"]*)",\s*dateSort:\s*"([^"]*)",\s*headline:\s*"([^"]*)",\s*content:\s*"([^"]*)",\s*authors:\s*"([^"]*)",\s*paperTitle:\s*"([^"]*)",\s*venue:\s*"([^"]*)",/g;
  
  let match;
  while ((match = paperRegex.exec(arrayContent)) !== null) {
    const headline = match[3];
    const content = match[4];
    const authors = match[5];
    const paperTitle = match[6];
    const venue = match[7];
    
    // Create a searchable content string with all paper information
    const searchableContent = `${headline} ${content} ${authors} ${paperTitle} ${venue}`.trim();
    
    entries.push({
      title: paperTitle || headline,
      url: "/research",
      description: content,
      category: "Research",
      content: truncate(searchableContent, 4000),
    });
  }
  
  // Also try to match papers with optional fields (codeLink, link, category, image)
  // More flexible regex that handles optional fields
  const flexiblePaperRegex = /\{\s*date:\s*"([^"]*)",[\s\S]*?headline:\s*"([^"]*)",[\s\S]*?content:\s*"([^"]*)",[\s\S]*?authors:\s*"([^"]*)",[\s\S]*?paperTitle:\s*"([^"]*)",[\s\S]*?venue:\s*"([^"]*)",/g;
  
  // Reset and try flexible regex if we didn't find papers
  if (entries.length === 0) {
    let flexMatch;
    while ((flexMatch = flexiblePaperRegex.exec(arrayContent)) !== null) {
      const headline = flexMatch[2];
      const content = flexMatch[3];
      const authors = flexMatch[4];
      const paperTitle = flexMatch[5];
      const venue = flexMatch[6];
      
      const searchableContent = `${headline} ${content} ${authors} ${paperTitle} ${venue}`.trim();
      
      entries.push({
        title: paperTitle || headline,
        url: "/research",
        description: content,
        category: "Research",
        content: truncate(searchableContent, 4000),
      });
    }
  }
  
  return entries;
}

function collectStaticPages(): SearchEntry[] {
  const pages = [
    { name: "Research", file: path.join(APP_DIR, "research", "page.tsx"), url: "/research" },
    { name: "Experience", file: path.join(APP_DIR, "experience", "page.tsx"), url: "/experience" },
    { name: "Projects", file: path.join(APP_DIR, "projects", "page.tsx"), url: "/projects" },
    { name: "Contact", file: path.join(APP_DIR, "contact", "page.tsx"), url: "/contact" },
    { name: "Blog", file: path.join(APP_DIR, "blog", "page.tsx"), url: "/blog" },
    { name: "Home", file: path.join(APP_DIR, "page.tsx"), url: "/" },
  ];

  const entries: SearchEntry[] = [];
  for (const page of pages) {
    const raw = readFileSafe(page.file);
    if (!raw) continue;
    let title = extractTitle(raw) || page.name;
    // Special case: home page should be "Bio"
    if (page.url === "/") {
      title = "Bio";
    }
    const content = extractJSXText(raw);
    const description = extractDescription(raw, content);
    
    entries.push({
      title,
      url: page.url,
      description,
      category: "Page",
      content: truncate(content, 4000),
    });
  }
  
  // Add individual papers from Newspaper component
  const papers = extractPapersFromNewspaper();
  entries.push(...papers);
  
  return entries;
}

function buildIndex() {
  const blogPosts = collectBlogPosts();
  const staticPages = collectStaticPages();
  const index = [...blogPosts, ...staticPages];
  ensureDir(PUBLIC_DIR);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  console.log(`Search index generated with ${index.length} entries -> ${OUTPUT_FILE}`);
}

buildIndex();

