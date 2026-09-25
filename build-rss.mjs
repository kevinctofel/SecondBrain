#!/usr/bin/env node
// Generates rss.xml from Articles/*.md before Eleventy build.
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const grayMatterPath = require.resolve("gray-matter", { paths: [path.join(__dirname, ".app", "node_modules")] });
const matter = require(grayMatterPath);

const articlesDir = path.join(__dirname, "Articles");
const base = "https://kctofel.com";
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith(".md"));

const articles = files.map(f => {
  const { data } = matter(fs.readFileSync(path.join(articlesDir, f), "utf8"));
  return {
    title: data.title || "",
    description: data.description || "",
    date: data.date || null,
    slug: f.replace(/\.md$/, "").replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, ""),
  };
}).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

let lastBuild = new Date();
for (const a of articles) {
  if (a.date) {
    const t = new Date(a.date);
    if (t > lastBuild) lastBuild = t;
  }
}

let items = "";
for (const post of articles) {
  const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
  const url = `${base}/n/articles/${post.slug}/`;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  items += `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${esc(post.description || "")}</description>
    </item>
`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kevin C. Tofel</title>
    <link>${base}</link>
    <description>Tech, hardware, Linux, programming, and AI notes.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}  </channel>
</rss>`;

// Write to both repo root and dist (dist may not exist yet)
const outDir = __dirname;
fs.writeFileSync(path.join(outDir, "rss.xml"), xml);
const distDir = path.join(__dirname, ".app", "dist");
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, "rss.xml"), xml);
}
console.error(`[rss-build] Wrote rss.xml with ${articles.length} items`);
