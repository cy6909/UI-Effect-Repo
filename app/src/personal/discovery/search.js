import { concepts, termMatches } from './concepts.js';
import { normalizeText, subcategoryById } from './taxonomy.js';

const cached = new WeakMap();
function index(item) {
  if (cached.has(item)) return cached.get(item);
  const title = normalizeText(`${item.name} ${item.titleZh} ${item.slug || ''} ${item.code || ''}`);
  const upstream = normalizeText(
    `${item.description || ''} ${item.descriptionEn || ''} ${(item.tags || []).join(' ')}`
  );
  const editorial = normalizeText(
    [
      ...(subcategoryById[item.subcategory]?.labels || []),
      ...(item.discoveryTags || []).flatMap(t => t.labels),
      ...Object.values(item.guide || {})
        .filter(Array.isArray)
        .flat()
    ].join(' ')
  );
  const data = {
    title,
    upstream,
    editorial,
    all: `${title} ${upstream} ${editorial}`,
    tags: new Map((item.discoveryTags || []).map(t => [t.id, t]))
  };
  cached.set(item, data);
  return data;
}
const stopWords =
  /\b(i|want|need|a|an|the|for|with|that|can|some|to|of|and|please|effect|animation|component|suitable|show|me|make)\b|我想要|我需要|帮我|找一个|找一些|可以用来|可以|适合|用于|用来|希望|想要|需要|有没有|大概|效果|动效|组件|一个|一些|能够|能让|的话|最好|不要|不需要|不想要|排除|带有|具有|这种|那种|提供|实现|页面上|用户|比较|以及|或者|然后|比如|一点|帮忙|相关|满足|要求|大致|意思|的|了|能|在|给|做|和|有|用|不|是|也|就|很|得/g;
function occurrences(text, term) {
  const positions = [];
  let offset = 0;
  while ((offset = text.indexOf(term, offset)) !== -1) {
    if (
      /[\u3400-\u9fff]/.test(term) ||
      (!/[a-z0-9]/.test(text[offset - 1] || '') && !/[a-z0-9]/.test(text[offset + term.length] || ''))
    )
      positions.push(offset);
    offset += term.length;
  }
  return positions;
}
export function parseIntent(query) {
  const text = normalizeText(query).slice(0, 500),
    positive = new Set(),
    negative = new Set(),
    ranges = [];
  for (const c of Object.values(concepts))
    for (const term of c.terms.flatMap(t =>
      /^[a-z -]+$/.test(t) && !t.endsWith('s') ? [normalizeText(t), normalizeText(t) + 's'] : [normalizeText(t)]
    ))
      for (const at of occurrences(text, term)) {
        const prefix = text
          .slice(0, at)
          .split(/[，,。;；.!?]/)
          .pop();
        const neg =
          /(?:不要|不想要|不需要|不用|不含|排除|without\b|\bno\b|\bnot\b)(?:(?!但是|但要|instead).){0,18}$/.test(
            prefix
          );
        (neg ? negative : positive).add(c.id);
        ranges.push([at, at + term.length]);
      }
  for (const id of negative) positive.delete(id);
  const chars = text.split('');
  for (const [a, b] of ranges) for (let i = a; i < b; i++) chars[i] = ' ';
  const residual =
    chars
      .join('')
      .replace(stopWords, ' ')
      .match(/[a-z0-9]{2,}|[\u3400-\u9fff]{2,}/g) || [];
  return { text, positive: [...positive], negative: [...negative], residual: [...new Set(residual)] };
}
function closeWord(a, b) {
  if (a.length < 4 || Math.abs(a.length - b.length) > 1) return false;
  let i = 0,
    j = 0,
    edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length >= b.length) i++;
    if (b.length >= a.length) j++;
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}
export function rankByIntent(items, query) {
  const intent = parseIntent(query);
  if (!intent.text.trim()) return items.map(item => ({ item, score: 0, reasons: [] }));
  const results = [];
  for (let order = 0; order < items.length; order++) {
    const item = items[order],
      doc = index(item);
    if (intent.negative.some(id => doc.tags.has(id))) continue;
    const exact = doc.title.includes(intent.text),
      upstreamExact = doc.upstream.includes(intent.text);
    let score = exact ? 100 : upstreamExact ? 40 : 0;
    const reasons = [];
    let matched = 0;
    for (const id of intent.positive) {
      const c = concepts[id],
        tag = doc.tags.get(id);
      if (tag) {
        matched++;
        score += tag.basis === 'source-metadata' ? (c.facet === 'use' ? 20 : 12) : 3;
        reasons.push({ id, labels: c.labels, basis: tag.basis });
      } else if (c.terms.some(t => termMatches(doc.title, t))) {
        matched++;
        score += 12;
        reasons.push({ id, labels: c.labels, basis: 'source-metadata' });
      }
    }
    let residualMatched = 0;
    for (const token of intent.residual) {
      if (doc.title.includes(token)) {
        score += 18;
        residualMatched++;
      } else if (doc.upstream.includes(token)) {
        score += 7;
        residualMatched++;
      } else if (doc.editorial.includes(token)) {
        score += 3;
        residualMatched++;
      } else if (/^[a-z]+$/.test(token) && doc.title.split(/\W+/).some(word => closeWord(token, word))) {
        score += 5;
        residualMatched++;
      }
    }
    if (!intent.positive.length && !intent.residual.length && intent.negative.length) {
      results.push({ item, score: 0, reasons: [], order });
      continue;
    }
    if (!score) continue;
    // Preserve concrete nouns such as "ticket" after broad intent normalization.
    for (const token of intent.text.replace(stopWords, ' ').match(/[a-z]{4,}/g) || []) {
      if (termMatches(doc.title, token)) score += 16;
    }
    // A known name stays precise. Intent queries can return partial matches, ranked by coverage.
    const wanted = intent.positive.length + intent.residual.length;
    const coverage = wanted ? (matched + residualMatched) / wanted : 0;
    if (!exact && !upstreamExact && coverage < 0.4) continue;
    score += coverage * 20;
    results.push({ item, score, reasons: reasons.slice(0, 3), order });
  }
  return results.sort((a, b) => b.score - a.score || a.order - b.order);
}
