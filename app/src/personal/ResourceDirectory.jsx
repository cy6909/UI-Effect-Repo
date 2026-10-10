import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Library } from 'lucide-react';
import { useLocale } from './Locale';
import { resources, promptKindLabels } from './open-libraries/resources';
import { catalog } from './catalog';
export default function ResourceDirectory() {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('all');
  const filtered = resources.filter(
    r =>
      (kind === 'all' || r.promptKind === kind) &&
      `${r.name} ${r.noteZh} ${r.noteEn}`.toLowerCase().includes(query.toLowerCase())
  );
  const labels = {
    imported: t('源码已接入', 'Source imported'),
    indexed: t('原站索引', 'Reference index'),
    existing: t('已接入', 'Already imported'),
    account: t('按原站账户获取', 'Provider account'),
    paid: t('付费入口', 'Paid source'),
    reference: t('原站参考', 'Source reference')
  };
  return (
    <section className="uie-library uie-resource-page">
      <span className="uie-eyebrow">SOURCES / 16</span>
      <h1>{t('资源站导航', 'Source directory')}</h1>
      <p className="uie-detail-description">
        {t(
          '按原始来源和交付方式组织。站点入口与已导入的组件分别计数。',
          'Organized by original source and delivery type. Website links and imported components are counted separately.'
        )}
      </p>
      <div className="uie-toolbar">
        <label className="uie-search">
          <input
            aria-label={t('搜索资源站', 'Search sources')}
            placeholder={t('搜索名称或用途…', 'Search names or use cases…')}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </label>
        <select
          aria-label={t('资源提示词类型', 'Source prompt kind')}
          value={kind}
          onChange={e => setKind(e.target.value)}
        >
          <option value="all">{t('全部类型', 'All kinds')}</option>
          {Object.entries(promptKindLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label[locale === 'zh' ? 0 : 1]}
            </option>
          ))}
        </select>
      </div>
      <div className="uie-resource-grid">
        {filtered.map(r => (
          <article className="uie-resource-card" key={r.id}>
            <div className="uie-resource-title">
              <Library size={19} />
              <h2>{r.name}</h2>
            </div>
            <span className="uie-status">{labels[r.status]}</span>
            <span className="uie-source-badge">{promptKindLabels[r.promptKind][locale === 'zh' ? 0 : 1]}</span>
            <p>{locale === 'zh' ? r.noteZh : r.noteEn}</p>
            <div className="uie-motion-controls">
              {['imported', 'existing', 'indexed'].includes(r.status) && (
                <Link className="uie-action primary" to={`/?source=${r.id}`}>
                  {t('浏览', 'Browse')} {catalog.filter(x => x.source === r.id).length}
                </Link>
              )}
              <a className="uie-action" href={r.url} target="_blank" rel="noreferrer">
                {t('打开原站', 'Open source')}
                <ArrowUpRight size={14} />
              </a>
            </div>
            <a className="uie-original-note" href={r.policyUrl} target="_blank" rel="noreferrer">
              {t('来源与使用说明', 'Source and usage terms')} ↗
            </a>
          </article>
        ))}
      </div>
      {!filtered.length && <p className="uie-empty">{t('没有匹配的资源站', 'No matching sources')}</p>}
    </section>
  );
}
