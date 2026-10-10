import { Link } from 'react-router-dom';
import { useLocale } from '../Locale';
import { subcategoryById } from './taxonomy';
import { facetLabels } from './concepts';

export function FeatureTags({ item, onSelect, compact = false }) {
  const { locale, t } = useLocale();
  const index = locale === 'zh' ? 0 : 1;
  const features = item.discoveryTags.filter(tag => tag.facet !== 'delivery' && tag.facet !== 'use');
  const tags = compact
    ? (features.length ? features : item.discoveryTags.filter(tag => tag.facet === 'use')).slice(0, 4)
    : item.discoveryTags;
  return (
    <div className="uie-feature-tags">
      {tags.map(tag => {
        const title = `${facetLabels[tag.facet][index]} · ${tag.basis === 'editorial-suggestion' ? t('应用建议', 'Suggested application') : t('目录与原始资料', 'Catalog and source metadata')}`;
        return onSelect ? (
          <button key={tag.id} title={title} onClick={() => onSelect(tag.id)}>
            {tag.labels[index]}
          </button>
        ) : (
          <Link key={tag.id} title={title} to={`/?tag=${tag.id}`}>
            {tag.labels[index]}
          </Link>
        );
      })}
    </div>
  );
}

export default function ItemGuide({ item }) {
  const { locale, t } = useLocale();
  const index = locale === 'zh' ? 0 : 1;
  const sub = subcategoryById[item.subcategory];
  return (
    <section className="uie-item-guide" aria-label={t('组件应用指南', 'Component guide')}>
      <div className="uie-guide-heading">
        <strong>{t('认识这个组件', 'Understand this component')}</strong>
        <Link to={`/?category=${item.category}&sub=${encodeURIComponent(item.subcategory)}`}>
          {sub.labels[index]} ↗
        </Link>
      </div>
      <p>{item.guide.what[index]}</p>
      <FeatureTags item={item} />
      <details>
        <summary>{t('适合用在哪，为什么？', 'Where does it fit, and why?')}</summary>
        <dl>
          <div>
            <dt>{t('适用场景', 'Where to use')}</dt>
            <dd>{item.guide.where[index]}</dd>
          </div>
          <div>
            <dt>{t('选择理由', 'Why it fits')}</dt>
            <dd>{item.guide.why[index]}</dd>
          </div>
        </dl>
        <small>
          {t(
            '本库根据原始资料整理的应用建议；具体行为以演示和源码为准。',
            'Editorial guidance based on source metadata; check the demo and source for exact behavior.'
          )}
        </small>
      </details>
    </section>
  );
}
