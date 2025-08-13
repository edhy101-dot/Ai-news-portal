export type CategorySlug = "teknologi" | "perkembangan-ai" | "olahraga" | "lifestyle" | "selebritis";

export const CATEGORIES: Record<CategorySlug, { name: string; feeds: string[]; }> = {
  "teknologi": {
    name: "Teknologi",
    feeds: [
      "https://www.theverge.com/rss/index.xml",
      "https://feeds.arstechnica.com/arstechnica/index/"
    ]
  },
  "perkembangan-ai": {
    name: "Perkembangan AI",
    feeds: [
      "https://www.technologyreview.com/feed/",
      "https://feeds.feedburner.com/venturebeat/SZYF"
    ]
  },
  "olahraga": {
    name: "Olahraga",
    feeds: [
      "https://www.espn.com/espn/rss/news",
      "https://www.skysports.com/rss/12040"
    ]
  },
  "lifestyle": {
    name: "Lifestyle",
    feeds: [
      "https://www.theguardian.com/lifeandstyle/rss",
      "https://www.nytimes.com/svc/collections/v1/publish/www.nytimes.com/section/style/rss.xml"
    ]
  },
  "selebritis": {
    name: "Selebritis",
    feeds: [
      "https://www.etonline.com/news/rss",
      "https://people.com/feed/"
    ]
  }
};
