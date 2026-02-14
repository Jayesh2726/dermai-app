import siteContent from "../data/siteContent.js";

export function retrieveRelevantContent(query) {
  if (!query) return [];

  const lowerQuery = query.toLowerCase();

  return siteContent.filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.content.toLowerCase().includes(lowerQuery)
  );
}
