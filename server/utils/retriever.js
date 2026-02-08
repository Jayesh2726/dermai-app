import { siteContent } from "../data/siteContent.js";

export function retrieveRelevantContent(query) {
  const keywords = query.toLowerCase().split(" ");

  const matches = siteContent.filter(item =>
    keywords.some(word =>
      item.content.toLowerCase().includes(word)
    )
  );

  return matches.map(m => m.content).join("\n");
}
