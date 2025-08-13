import Parser from "rss-parser";
import { CATEGORIES } from "./sources";
import { slugify } from "./slugify";
import type { FeedItem } from "./types";

const parser = new Parser({
  timeout: 12000,
  headers: { "User-Agent": "ai-news-portal/1.0" }
});

function extractImage(item: any): string | undefined {
  const enclosures = (item.enclosure && [item.enclosure]) || item.enclosures || [];
  const cand = [...enclosures.map((e:any)=>e?.url), item.image?.url, item["media:content"]?.url, item["media:thumbnail"]?.url, item.thumbnail, item.enclosure?.url].filter(Boolean);
  if (cand.length) return cand[0];
  // try from content
  const html = item["content:encoded"] || item.content || "";
  const m = /<img[^>]+src=["']([^"']+)["']/i.exec(html);
  return m?.[1];
}

function excerptFromContent(item: any): string | undefined {
  const html = item["contentSnippet"] || item["content:encodedSnippet"] || item.contentSnippet || item.summary || "";
  return (html || "").toString().slice(0, 220);
}

// Basic in-memory cache per lambda cold start
let cache: { at: number; items: FeedItem[] } | null = null;

export async function fetchAllFeeds(category?: keyof typeof CATEGORIES): Promise<FeedItem[]> {
  const now = Date.now();
  if (cache && (now - cache.at) < 5 * 60 * 1000 && !category) {
    return cache.items;
  }

  const categories = category ? [category] : (Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]);
  const results: FeedItem[] = [];

  for (const cat of categories) {
    const catConf = CATEGORIES[cat];
    for (const feedUrl of catConf.feeds) {
      try {
        const feed = await parser.parseURL(feedUrl);
        for (const item of feed.items.slice(0, 12)) {
          const title = item.title || "Untitled";
          const slug = `${slugify(title)}-${Buffer.from((item.link||title)).toString("base64").slice(0,6)}`;
          results.push({
            id: item.guid || item.id || item.link || slug,
            title,
            link: item.link || "#",
            isoDate: item.isoDate,
            pubDate: item.pubDate,
            image: extractImage(item),
            excerpt: excerptFromContent(item),
            source: feed.title,
            category: catConf.name,
            slug
          });
        }
      } catch (e) {
        // ignore feed failure, continue others
        console.error("Feed error", feedUrl, e);
      }
    }
  }

  // De-duplicate by link
  const map = new Map<string, FeedItem>();
  for (const it of results) {
    if (!map.has(it.link)) map.set(it.link, it);
  }
  const items = Array.from(map.values()).sort((a,b)=>{
    const da = new Date(a.isoDate || a.pubDate || 0).getTime();
    const db = new Date(b.isoDate || b.pubDate || 0).getTime();
    return db - da;
  });

  if (!category) cache = { at: now, items };
  return items;
}

export async function findBySlug(slug: string): Promise<FeedItem | undefined> {
  const all = await fetchAllFeeds();
  return all.find(x => x.slug === slug);
}
