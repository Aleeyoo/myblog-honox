import type { Context } from "hono";

const RSS_TEMPLATE = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{title}</title>
    <link>{link}</link>
    <description>{description}</description>
    <language>zh-CN</language>
    <lastBuildDate>{lastBuildDate}</lastBuildDate>
    <atom:link href="{atomLink}" rel="self" type="application/rss+xml" />
    {items}
  </channel>
</rss>`;

const ITEM_TEMPLATE = `
    <item>
      <title>{title}</title>
      <link>{link}</link>
      <description>{description}</description>
      <pubDate>{pubDate}</pubDate>
      <guid isPermaLink="true">{link}</guid>
    </item>`;

export default function Rss(c: Context): Response {
  const posts = import.meta.glob<{
    frontmatter: { title: string; date: string; published: boolean; description: string };
  }>("./posts/*.mdx", { eager: true });

  const entries = Object.entries(posts).filter(
    ([_, module]) => module.frontmatter.published,
  );

  const sortedEntries = entries
    .sort((a, b) => {
      const dateA = new Date(a[1].frontmatter.date).getTime();
      const dateB = new Date(b[1].frontmatter.date).getTime();
      return dateB - dateA;
    })
    .slice(0, 20);

  const siteUrl = "https://blog.011205.xyz";
  const blogTitle = "Aleeyoo";
  const blogDescription = "只道只今句";

  const items = sortedEntries.map(([key, post]) => {
    const postUrl = `${siteUrl}${key.replace(/^\.\/posts\//, "/posts/").replace(/\.mdx$/, "").replace(/\./g, "")}`;
    const pubDate = new Date(post.frontmatter.date).toUTCString();
    
    return ITEM_TEMPLATE
      .replace("{title}", escapeXml(post.frontmatter.title))
      .replace("{link}", escapeXml(postUrl))
      .replace("{description}", escapeXml(post.frontmatter.description))
      .replace("{pubDate}", pubDate);
  }).join("");

  const rssContent = RSS_TEMPLATE
    .replace("{title}", escapeXml(blogTitle))
    .replace("{link}", escapeXml(siteUrl))
    .replace("{description}", escapeXml(blogDescription))
    .replace("{lastBuildDate}", new Date().toUTCString())
    .replace("{atomLink}", escapeXml(`${siteUrl}/rss.xml`))
    .replace("{items}", items);

  c.header("Content-Type", "application/rss+xml; charset=utf-8");
  c.header("Cache-Control", "public, max-age=3600");
  
  return c.body(rssContent);
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}