import { levenshtein } from './fuzzy';

const normalize = value => (value || '').toString().toLowerCase().trim();

const tokenScore = (item, token) => {
  const name = normalize(item.title || item.name);
  const category = normalize(item.categoryLabel || item.category);
  const tags = (item.tags || []).map(normalize);
  const description = normalize(item.description);

  if (name === token) return { score: 100, type: 'name' };
  if (name.startsWith(token)) return { score: 90, type: 'name' };
  if (name.includes(token)) return { score: 80, type: 'name' };
  if (tags.some(tag => tag === token)) return { score: 72, type: 'tag' };
  if (tags.some(tag => tag.startsWith(token) || tag.includes(token))) return { score: 62, type: 'tag' };
  if (category.includes(token)) return { score: 50, type: 'category' };
  if (description.includes(token)) return { score: 38, type: 'description' };

  if (token.length >= 4) {
    const maxDistance = token.length <= 5 ? 1 : 2;
    const similar = name.split(/\s+/).some(word => levenshtein(word, token) <= maxDistance);
    if (similar) return { score: 20, type: 'similar' };
  }

  return null;
};

export const rankComponentSearch = (item, query) => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return { score: 1, type: 'name' };

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const matches = tokens.map(token => tokenScore(item, token));
  if (matches.some(match => !match)) return null;

  const score = matches.reduce((total, match) => total + match.score, 0) / matches.length;
  const weakestMatch = [...matches].sort((a, b) => a.score - b.score)[0];
  return { score, type: weakestMatch.type };
};

export const getComponentMatchLabel = (category, type) => {
  if (type === 'tag') return `${category} · tag match`;
  if (type === 'description') return `${category} · description match`;
  if (type === 'category') return `${category} · category match`;
  if (type === 'similar') return `${category} · similar name`;
  return `in ${category}`;
};
