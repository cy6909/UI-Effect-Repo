import { Component, Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Code2,
  Github,
  Grid2X2,
  Heart,
  Layers,
  Menu,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  X
} from 'lucide-react';
import { catalog, categoryLabels, descriptionsZh, filterCatalog, sourceLabels } from './catalog';
import { LocaleProvider, useLocale } from './Locale';
import CopyButton from './CopyButton';
import MotionPromptDetail from './MotionPromptDetail';
import PersonalAiDetail from './PersonalAiDetail';
import OpenLibraryDetail from './OpenLibraryDetail';
import ResourceDirectory from './ResourceDirectory';
import ItemGuide, { FeatureTags } from './discovery/ItemGuide';
import { subcategories, subcategoryById } from './discovery/taxonomy';
import { tagById, facetLabels } from './discovery/concepts';
import { rankByIntent, parseIntent } from './discovery/search';
import { promptKindLabels } from './open-libraries/resources';
import './personal.css';

const DemoFrame = lazy(() => import('./DemoFrame'));
const SOURCE_URL = 'https://github.com/cy6909/react-bits';
const readSaved = () => {
  try {
    const v = JSON.parse(localStorage.getItem('uie-saved') || '[]');
    return Array.isArray(v) ? v.filter(x => typeof x === 'string') : [];
  } catch {
    return [];
  }
};
export class DemoBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="uie-empty">
        <h2>演示暂时不可用 / Preview unavailable</h2>
        <p>该效果可能需要 WebGL 或外部素材。可查看源码或重新载入。</p>
        <button onClick={() => window.location.reload()}>重新载入 / Reload</button>
      </div>
    ) : (
      this.props.children
    );
  }
}

function VideoCover({ item, featured = false }) {
  const video = useRef(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  useEffect(() => {
    if (!video.current) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px' }
    );
    observer.observe(video.current);
    return () => observer.disconnect();
  }, []);
  const play = () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.play().catch(() => {});
  };
  return (
    <div
      className={`uie-cover ${featured ? 'featured' : ''}`}
      onMouseEnter={play}
      onMouseLeave={() => {
        video.current?.pause();
        setPlaying(false);
      }}
      onFocus={play}
    >
      <span className="uie-cover-fallback">{item.name}</span>
      {item.posterUrl && !posterFailed && (
        <img src={item.posterUrl} alt="" loading="lazy" className="uie-poster" onError={() => setPosterFailed(true)} />
      )}
      {!failed && item.videoUrl && (
        <video
          ref={video}
          src={visible ? item.videoUrl : undefined}
          style={{ opacity: playing ? 1 : 0 }}
          onPlaying={() => setPlaying(true)}
          muted
          loop
          playsInline
          preload="none"
          onError={() => setFailed(true)}
          aria-hidden="true"
        />
      )}
      <span className="uie-cover-arrow">
        <ArrowRight size={18} />
      </span>
    </div>
  );
}

function Shell() {
  const { locale, setLocale, t } = useLocale();
  const [params, setParams] = useSearchParams();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [saved, setSaved] = useState(readSaved);
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
  }, [pathname]);
  const toggleSaved = id =>
    setSaved(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('uie-saved', JSON.stringify(next));
      } catch {
        /* unavailable storage */
      }
      return next;
    });
  const category = params.get('category') || 'all';
  const source = params.get('source') || 'all';
  const nav = (value, favorites = false, sub = '') => {
    const next = new URLSearchParams(isHome ? params : {});
    next.delete('sub');
    if (value === 'all') next.delete('category');
    else next.set('category', value);
    if (favorites) next.set('saved', '1');
    if (sub) next.set('sub', sub);
    return `/?${next}`;
  };
  const isHome = pathname === '/';
  return (
    <div className="uie-app">
      <a className="uie-skip" href="#main">
        {t('跳到内容', 'Skip to content')}
      </a>
      <header className="uie-header">
        <button
          className="uie-icon uie-mobile-menu"
          aria-label={t('打开分类', 'Open categories')}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link className="uie-brand" to="/">
          <span className="uie-mark">
            <Layers size={21} />
          </span>
          <strong>
            UI / Bits<span>{t('我的动效收藏库', 'Personal collection')}</span>
          </strong>
        </Link>
        <div className="uie-header-right">
          <span className="uie-personal-label">PERSONAL EDITION</span>
          <button
            className="uie-language"
            onClick={() => {
              const next = locale === 'zh' ? 'en' : 'zh';
              setLocale(next);
              if (params.has('lang')) {
                const p = new URLSearchParams(params);
                p.set('lang', next);
                setParams(p, { replace: true });
              }
            }}
            aria-label={t('切换英文', 'Switch to Chinese')}
          >
            {locale === 'zh' ? 'EN' : '中文'}
          </button>
          <a className="uie-icon" href={SOURCE_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
        </div>
      </header>
      {menu && (
        <button
          className="uie-backdrop"
          aria-label={t('关闭分类', 'Close categories')}
          onClick={() => setMenu(false)}
        />
      )}
      <aside className={`uie-sidebar ${menu ? 'is-open' : ''}`}>
        <p className="uie-nav-label">{t('工作空间', 'WORKSPACE')}</p>
        <Link
          onClick={() => setMenu(false)}
          className={isHome && category === 'all' && source !== 'personal-ai' && !params.has('saved') ? 'active' : ''}
          to="/"
        >
          <Grid2X2 size={17} />
          {t('全部组件', 'All components')}
          <span>{catalog.length}</span>
        </Link>
        <Link
          onClick={() => setMenu(false)}
          className={isHome && params.has('saved') ? 'active' : ''}
          to={nav('all', true)}
        >
          <Heart size={17} />
          {t('我的收藏', 'Saved')}
          <span>{saved.length}</span>
        </Link>
        <Link
          to="/?source=personal-ai"
          onClick={() => setMenu(false)}
          className={source === 'personal-ai' || pathname.startsWith('/personal-ai/') ? 'active' : ''}
        >
          <Sparkles size={17} />
          {t('个人 AI 实现', 'Personal AI')}
          <span>7</span>
        </Link>
        <Link to="/resources" onClick={() => setMenu(false)} className={pathname === '/resources' ? 'active' : ''}>
          <Layers size={17} />
          {t('资源站导航', 'Source directory')}
          <span>16</span>
        </Link>
        <p className="uie-nav-label">{t('按类别探索', 'EXPLORE')}</p>
        {Object.entries(categoryLabels).map(([key, labels], index) => (
          <div className="uie-category-tree" key={key}>
            <Link to={nav(key)} onClick={() => setMenu(false)} className={isHome && category === key ? 'active' : ''}>
              <span className="uie-category-dot" data-tone={index} />
              {labels[locale === 'zh' ? 0 : 1]}
              <span>{catalog.filter(x => x.category === key && (source === 'all' || x.source === source)).length}</span>
            </Link>
            {isHome && category === key && (
              <div className="uie-subnav">
                {subcategories
                  .filter(sub => sub.category === key)
                  .map(sub => {
                    const count = catalog.filter(
                      item => item.subcategory === sub.id && (source === 'all' || item.source === source)
                    ).length;
                    return (
                      count > 0 && (
                        <Link
                          key={sub.id}
                          to={nav(key, false, sub.id)}
                          onClick={() => setMenu(false)}
                          aria-current={params.get('sub') === sub.id ? 'page' : undefined}
                        >
                          {sub.labels[locale === 'zh' ? 0 : 1]}
                          <span>{count}</span>
                        </Link>
                      )
                    );
                  })}
              </div>
            )}
          </div>
        ))}
        <div className="uie-side-note">
          <span className="uie-note-icon">✳</span>
          <p>{t('看见效果，也带走实现。', 'Explore the effect. Keep the code.')}</p>
          <small>{t('灵感 · 体验 · 复用', 'DISCOVER · PLAY · BUILD')}</small>
        </div>
        <div className="uie-attribution">
          Built on{' '}
          <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">
            React Bits ↗
          </a>
          <br />
          <a href="/LICENSE.md" target="_blank" rel="noreferrer">
            {t('上游许可与署名', 'License & attribution')}
          </a>
          <br />
          <a href="https://motionprompts.dev" target="_blank" rel="noreferrer">
            Motion Prompts ↗
          </a>
          <br />
          <a href="/motion-prompts/LICENSE.txt" target="_blank" rel="noreferrer">
            {t('非商业使用 · 来源许可', 'Noncommercial · License')}
          </a>
        </div>
      </aside>
      <main id="main" className="uie-main">
        <Routes>
          <Route path="/" element={<Library saved={saved} toggleSaved={toggleSaved} />} />
          <Route path="/resources" element={<ResourceDirectory />} />
          <Route path="/:category/:subcategory" element={<Detail saved={saved} toggleSaved={toggleSaved} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function Library({ saved, toggleSaved }) {
  const { locale, t } = useLocale();
  const [params, setParams] = useSearchParams();
  const [limit, setLimit] = useState(24);
  const query = params.get('q') || '';
  const category = params.get('category') || 'all';
  const source = params.get('source') || 'all';
  const access = params.get('access') || 'all';
  const kind = params.get('kind') || 'all';
  const subcategory = params.get('sub') || 'all';
  const tag = params.get('tag') || 'all';
  const mode = params.get('mode') === 'keyword' ? 'keyword' : 'intent';
  const savedOnly = params.get('saved') === '1';
  const update = (key, value) => {
    const p = new URLSearchParams(params);
    if (key === 'category') p.delete('sub');
    if (value) p.set(key, value);
    else p.delete(key);
    setParams(p, { replace: true });
  };
  useEffect(() => setLimit(24), [query, category, source, access, kind, savedOnly, subcategory, tag, mode]);
  const results = useMemo(() => {
    const filtered = filterCatalog(catalog, {
      query: mode === 'keyword' ? query : '',
      category,
      subcategory,
      tag,
      source,
      access,
      kind,
      savedOnly,
      saved
    });
    return mode === 'intent' ? rankByIntent(filtered, query) : filtered.map(item => ({ item, reasons: [] }));
  }, [query, category, subcategory, tag, source, access, kind, savedOnly, saved, mode]);
  const items = results.map(result => result.item);
  const intent = useMemo(() => parseIntent(query), [query]);
  const hero =
    !query &&
    category === 'all' &&
    source === 'all' &&
    access === 'all' &&
    kind === 'all' &&
    !savedOnly &&
    tag === 'all' &&
    subcategory === 'all';
  useEffect(() => {
    document.title = t('UI / Bits · 我的动效收藏库', 'UI / Bits · Personal collection');
  }, [locale, t]);
  return (
    <>
      {hero && (
        <section className="uie-hero">
          <div>
            <p className="uie-eyebrow">
              <span /> {t('属于你的界面灵感档案', 'YOUR INTERFACE INSPIRATION ARCHIVE')}
            </p>
            <h1>
              {t('好界面，', 'Good interfaces.')}
              <br />
              <em>{t('从一个好动效开始。', 'A little motion goes a long way.')}</em>
            </h1>
            <p className="uie-hero-description">
              {t('收集值得复用的细节。预览效果、调整参数，', 'Collect the details worth reusing. Preview, customize,')}
              <br className="uie-desktop" />
              {t('把下一次创作的灵感，变成可以带走的代码。', 'and take the code into your next creation.')}
            </p>
            <a href="#catalog" className="uie-explore">
              {t('探索组件', 'Explore collection')}
              <ArrowDown size={16} />
            </a>
          </div>
          <Link className="uie-feature" to="/components/depth-carousel">
            <VideoCover item={catalog.find(x => x.name === 'DepthCarousel')} featured />
            <div>
              <span>01 / {t('精选交互', 'IN FOCUS')}</span>
              <strong>
                {t('纵深轮播', 'Depth Carousel')} <ArrowRight size={18} />
              </strong>
            </div>
          </Link>
        </section>
      )}
      <section id="catalog" className="uie-library">
        <div className="uie-section-heading">
          <div>
            <span className="uie-eyebrow">THE COLLECTION</span>
            <h2>
              {savedOnly
                ? t('我的收藏', 'Saved collection')
                : categoryLabels[category]?.[locale === 'zh' ? 0 : 1] || t('探索组件', 'Explore components')}{' '}
              <span>{items.length}</span>
            </h2>
          </div>
          <a href="/personal-registry/index.json" target="_blank" rel="noreferrer" className="uie-registry-link">
            <Code2 size={15} />
            {t('AI 目录', 'AI registry')} ↗
          </a>
        </div>
        <div className="uie-source-pills" role="group" aria-label={t('内容来源', 'Content source')}>
          {[['all', t('全部来源', 'All sources')], ...Object.entries(sourceLabels)].map(([key, label]) => (
            <button key={key} aria-pressed={source === key} onClick={() => update('source', key === 'all' ? '' : key)}>
              {key === 'personal-ai' ? t('个人 AI 实现', 'Personal AI') : label}
              <span>{key === 'all' ? catalog.length : catalog.filter(x => x.source === key).length}</span>
            </button>
          ))}
        </div>
        <div className="uie-toolbar">
          <label className="uie-search">
            <Search size={18} />
            <input
              aria-label={t('搜索组件', 'Search components')}
              value={query}
              onChange={e => update('q', e.target.value)}
              placeholder={t(
                '描述用途或效果，例如：拖动票根展开',
                'Describe a use or effect, e.g. a draggable ticket reveal'
              )}
            />
            {query && (
              <button aria-label={t('清空搜索', 'Clear search')} onClick={() => update('q', '')}>
                <X size={16} />
              </button>
            )}
          </label>
          <label className="uie-select">
            <span className="uie-sr-only">{t('搜索方式', 'Search mode')}</span>
            <select value={mode} onChange={e => update('mode', e.target.value === 'intent' ? '' : e.target.value)}>
              <option value="intent">{t('意图搜索', 'Intent search')}</option>
              <option value="keyword">{t('关键词', 'Keywords')}</option>
            </select>
          </label>
          <label className="uie-select">
            <span className="uie-sr-only">{t('类别筛选', 'Category filter')}</span>
            <select value={category} onChange={e => update('category', e.target.value === 'all' ? '' : e.target.value)}>
              <option value="all">{t('全部类别', 'All categories')}</option>
              {Object.entries(categoryLabels).map(([key, labels]) => (
                <option key={key} value={key}>
                  {labels[locale === 'zh' ? 0 : 1]}
                </option>
              ))}
            </select>
          </label>
          <label className="uie-select">
            <span className="uie-sr-only">{t('提示词范围', 'Prompt access')}</span>
            <select value={access} onChange={e => update('access', e.target.value === 'all' ? '' : e.target.value)}>
              <option value="all">{t('全部提示词', 'All prompt access')}</option>
              <option value="full">{t('完整公开', 'Full public')}</option>
              <option value="preview">{t('仅官方预览', 'Official excerpt only')}</option>
              <option value="unavailable">{t('未归档提示词', 'No archived prompt')}</option>
              <option value="external">{t('原站获取', 'Get upstream')}</option>
            </select>
          </label>
        </div>
        <div className="uie-discovery-filters">
          {category !== 'all' && (
            <label>
              {t('子类', 'Subcategory')}
              <select
                aria-label={t('子类筛选', 'Subcategory filter')}
                value={subcategory}
                onChange={e => update('sub', e.target.value === 'all' ? '' : e.target.value)}
              >
                <option value="all">{t('全部子类', 'All subcategories')}</option>
                {subcategories
                  .filter(sub => sub.category === category)
                  .map(sub => {
                    const count = catalog.filter(
                      item => item.subcategory === sub.id && (source === 'all' || item.source === source)
                    ).length;
                    return (
                      (count > 0 || sub.id === subcategory) && (
                        <option key={sub.id} value={sub.id}>
                          {sub.labels[locale === 'zh' ? 0 : 1]} · {count}
                        </option>
                      )
                    );
                  })}
              </select>
            </label>
          )}
          <label>
            {t('标签', 'Trait')}
            <select
              aria-label={t('标签筛选', 'Tag filter')}
              value={tag}
              onChange={e => update('tag', e.target.value === 'all' ? '' : e.target.value)}
            >
              <option value="all">{t('全部标签', 'All traits')}</option>
              {Object.entries(facetLabels).map(([facet, labels]) => (
                <optgroup key={facet} label={labels[locale === 'zh' ? 0 : 1]}>
                  {Object.values(tagById)
                    .filter(t => t.facet === facet)
                    .map(t => (
                      <option key={t.id} value={t.id}>
                        {t.labels[locale === 'zh' ? 0 : 1]}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          {(tag !== 'all' || subcategory !== 'all') && (
            <button
              onClick={() => {
                const p = new URLSearchParams(params);
                p.delete('sub');
                p.delete('tag');
                setParams(p);
              }}
            >
              {t('清除子类与标签', 'Clear subcategory and trait')} ×
            </button>
          )}
        </div>
        <div className="uie-search-help">
          <p>
            {mode === 'intent'
              ? t(
                  '按用途、交互和视觉特点匹配；支持中英同义词及“不要…”排除。',
                  'Matches uses, interactions and visual traits, with bilingual synonyms and “without…” exclusions.'
                )
              : t('按原始名称、说明与关键词查找。', 'Search original names, descriptions and keywords.')}
          </p>
          {!query && (
            <div>
              {(locale === 'zh'
                ? ['适合会员卡的展开效果', '拖动票根展开', '柔和背景，不要粒子']
                : ['expand a membership card', 'draggable ticket reveal', 'subtle background without particles']
              ).map(text => (
                <button key={text} onClick={() => update('q', text)}>
                  {text} ↗
                </button>
              ))}
            </div>
          )}
          {query && mode === 'intent' && (
            <p aria-live="polite">
              {t('理解为：', 'Interpreted as: ')}
              {intent.positive.map(id => tagById[id].labels[locale === 'zh' ? 0 : 1]).join(' · ') ||
                t('描述关键词匹配', 'Descriptive keywords')}
              {intent.negative.length > 0 &&
                ` / ${t('排除：', 'Exclude: ')}${intent.negative.map(id => tagById[id].labels[locale === 'zh' ? 0 : 1]).join(' · ')}`}
            </p>
          )}
        </div>
        <div className="uie-kind-filter">
          <label>
            {t('提示词性质', 'Prompt kind')}{' '}
            <select
              aria-label={t('提示词性质', 'Prompt kind')}
              value={kind}
              onChange={e => update('kind', e.target.value === 'all' ? '' : e.target.value)}
            >
              <option value="all">{t('全部性质', 'All kinds')}</option>
              {Object.entries(promptKindLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label[locale === 'zh' ? 0 : 1]}
                </option>
              ))}
            </select>
          </label>
          <Link to="/resources">{t('查看 16 个资源站及接入范围', 'View 16 sources and import scope')} ↗</Link>
        </div>
        {['motion-vault', 'shadcn-studio', 'shadcn-io'].includes(source) && (
          <p className="uie-source-note">
            {source === 'motion-vault'
              ? t(
                  '202 个上游实现 · 原始英文 Prompt + TSX 源码 · 本地按需体验',
                  '202 upstream implementations · Original English prompts + TSX · On-demand local previews'
                )
              : source === 'shadcn-studio'
                ? t(
                    '637 份 MIT 源码包 · 未归档原始 Prompt · 演示在原站打开',
                    '637 MIT source bundles · No archived original prompts · Demos open upstream'
                  )
                : t(
                    '75 个官方 README 参考链接 · 未导入组件实现源码',
                    '75 official README reference links · No component implementation source imported'
                  )}
          </p>
        )}
        {source === 'personal-ai' && (
          <p className="uie-source-note">
            {t(
              '我的 7 个 AI 实现 · 可操作 HTML、原始源码与 Notion 记录。保留参考来源与实际验证范围。',
              'My 7 AI implementations · Interactive HTML, original source and Notion records, with references and verification scope preserved.'
            )}
          </p>
        )}
        {source === 'motion-prompts' && (
          <p className="uie-source-note">
            {t(
              '248 个组件与设计 · 30 份完整公开提示词 · 218 份官方预览。交互演示在原站打开。',
              '248 components and designs · 30 full public prompts · 218 official excerpts. Interactive demos open on the source site.'
            )}
          </p>
        )}
        <div className="uie-grid">
          {results.slice(0, limit).map(({ item, reasons }) => (
            <article className="uie-card" key={item.id} data-source={item.source}>
              <Link
                className="uie-card-visual"
                to={item.path}
                aria-label={`${t('体验', 'Explore')} ${locale === 'zh' ? item.titleZh : item.name}`}
              >
                <VideoCover item={item} />
              </Link>
              <div className="uie-card-info">
                <div>
                  <span className="uie-card-category">
                    {subcategoryById[item.subcategory]?.labels[locale === 'zh' ? 0 : 1]}
                    <span className="uie-source-badge">
                      {item.source === 'personal-ai' ? t('个人 AI 实现', 'Personal AI') : sourceLabels[item.source]}
                    </span>
                  </span>
                  <Link to={item.path}>
                    <h3>{locale === 'zh' ? item.titleZh : item.name}</h3>
                  </Link>
                  <p>{locale === 'zh' ? item.name : item.titleZh}</p>
                </div>
                <button
                  className={`uie-save ${saved.includes(item.id) ? 'saved' : ''}`}
                  onClick={() => toggleSaved(item.id)}
                  aria-pressed={saved.includes(item.id)}
                  aria-label={`${saved.includes(item.id) ? t('取消收藏', 'Unsave') : t('收藏', 'Save')} ${locale === 'zh' ? item.titleZh : item.name}`}
                >
                  <Heart size={17} fill={saved.includes(item.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="uie-card-guide">
                <p>{item.guide.what[locale === 'zh' ? 0 : 1]}</p>
                <FeatureTags item={item} compact onSelect={id => update('tag', id)} />
                {query && reasons.length > 0 && (
                  <small className="uie-match-reasons">
                    {t('匹配：', 'Matches: ')}
                    {reasons.map(reason => reason.labels[locale === 'zh' ? 0 : 1]).join(' · ')}
                  </small>
                )}
              </div>
            </article>
          ))}
        </div>
        {!items.length && (
          <div className="uie-empty">
            <Search size={32} />
            <h3>{t('这里还没有匹配的组件', 'No matching components')}</h3>
            <p>{t('试试其他关键词，或清除筛选条件。', 'Try another keyword, or clear the filters.')}</p>
            <button onClick={() => setParams({})}>{t('查看全部组件', 'Show all components')}</button>
          </div>
        )}
        {items.length > limit && (
          <button className="uie-load" onClick={() => setLimit(x => x + 24)}>
            {t('加载更多', 'Load more')}
            <ArrowDown size={16} />
            <span>
              {Math.min(limit, items.length)} / {items.length}
            </span>
          </button>
        )}
        <footer className="uie-footer">
          <span>{t('把喜欢的交互，留给下一次创作。', 'Save an interaction for your next creation.')}</span>
          <span>UI / Bits · React Bits personal edition</span>
        </footer>
      </section>
    </>
  );
}

function SourcePanel({ item }) {
  const { t } = useLocale();
  const [variant, setVariant] = useState(item.variants.includes('TS-CSS') ? 'TS-CSS' : item.variants[0]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const ac = new AbortController();
    setData(null);
    setError(false);
    setIndex(0);
    fetch(`/r/${item.name}-${variant}.json`, { signal: ac.signal })
      .then(r => {
        if (!r.ok) throw new Error('source');
        return r.json();
      })
      .then(setData)
      .catch(e => {
        if (e.name !== 'AbortError') setError(true);
      });
    return () => ac.abort();
  }, [item.name, variant]);
  const file = data?.files?.[index];
  return (
    <section className="uie-source">
      <div className="uie-source-toolbar">
        <label>
          {t('代码版本', 'Variant')}{' '}
          <select aria-label={t('代码版本', 'Variant')} value={variant} onChange={e => setVariant(e.target.value)}>
            {item.variants.map(v => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <a className="uie-action" download={`${item.name}-${variant}.json`} href={`/r/${item.name}-${variant}.json`}>
          <Code2 size={16} />
          {t('下载完整源码包', 'Download source bundle')}
        </a>
      </div>
      {error ? (
        <p role="alert">
          {t('源码加载失败，请重新选择版本或重试。', 'Source could not load. Choose the variant again or retry.')}
        </p>
      ) : !data ? (
        <p role="status">{t('读取源码…', 'Loading source…')}</p>
      ) : (
        <>
          <p className="uie-source-deps">
            {t('依赖', 'Dependencies')}：{data.dependencies?.join(', ') || 'React'} ·{' '}
            <a href="/LICENSE.md">{t('上游许可', 'Upstream license')}</a>
          </p>
          <div className="uie-file-tabs">
            {data.files?.map((f, i) => (
              <button key={f.path} className={i === index ? 'selected' : ''} onClick={() => setIndex(i)}>
                {f.path.split('/').pop()}
              </button>
            ))}
          </div>
          {file && (
            <>
              <CopyButton key={file.path + variant} text={file.content} label={t('复制当前文件', 'Copy file')} />
              <pre tabIndex={0}>
                <code>{file.content}</code>
              </pre>
            </>
          )}
        </>
      )}
    </section>
  );
}

function Detail({ saved, toggleSaved }) {
  const { pathname } = useLocation();
  const item = catalog.find(x => x.path === pathname);
  if (!item) return <NotFound />;
  if (item.detailUrl?.startsWith('/open-libraries/'))
    return <OpenLibraryDetail key={item.id} item={item} saved={saved} toggleSaved={toggleSaved} />;
  if (item.source === 'personal-ai')
    return <PersonalAiDetail key={item.id} item={item} saved={saved} toggleSaved={toggleSaved} />;
  return item.source === 'motion-prompts' ? (
    <MotionPromptDetail key={item.id} item={item} saved={saved} toggleSaved={toggleSaved} />
  ) : (
    <DetailContent key={item.id} item={item} saved={saved} toggleSaved={toggleSaved} />
  );
}
function DetailContent({ item, saved, toggleSaved }) {
  const { locale, t } = useLocale();
  const [tab, setTab] = useState(() =>
    new URLSearchParams(window.location.search).get('view') === 'prompt' ? 'prompt' : 'preview'
  );
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState('playing');
  const frameRef = useRef(null);
  const [originalPrompts, setOriginalPrompts] = useState(null);
  const [promptLanguage, setPromptLanguage] = useState(locale);
  const [promptFailed, setPromptFailed] = useState(false);
  useEffect(() => setPromptLanguage(locale), [locale]);
  useEffect(() => {
    const receive = event => {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      const data = event.data;
      if (
        data?.type !== 'uie:upstream-prompt' ||
        data.componentName !== item.name ||
        typeof data.en !== 'string' ||
        typeof data.zh !== 'string'
      )
        return;
      setOriginalPrompts({ en: data.en, zh: data.zh, variant: data.variant });
      setPromptFailed(false);
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [item.name]);
  useEffect(() => {
    if (tab !== 'prompt' || originalPrompts) return;
    const timer = setTimeout(() => setPromptFailed(true), 15000);
    return () => clearTimeout(timer);
  }, [tab, originalPrompts, round]);
  useEffect(() => {
    document.title = `${locale === 'zh' ? item.titleZh : item.name} · UI / Bits`;
  }, [item, locale]);
  return (
    <article className="uie-detail">
      <Link className="uie-back" to="/">
        <ArrowLeft size={15} />
        {t('返回组件库', 'Back to collection')}
      </Link>
      <div className="uie-detail-heading">
        <div>
          <span className="uie-eyebrow">{categoryLabels[item.category]?.[locale === 'zh' ? 0 : 1]} / REACT BITS</span>
          <h1>{locale === 'zh' ? item.titleZh : item.name}</h1>
          <p className="uie-detail-subtitle">
            {locale === 'zh' ? item.name : item.titleZh} <span>· {t('可交互演示', 'Interactive demo')}</span>
          </p>
        </div>
        <button
          className={`uie-action ${saved.includes(item.id) ? 'selected' : ''}`}
          onClick={() => toggleSaved(item.id)}
          aria-pressed={saved.includes(item.id)}
        >
          <Heart size={16} />
          {saved.includes(item.id) ? t('已收藏', 'Saved') : t('收藏组件', 'Save component')}
        </button>
      </div>
      <p className="uie-detail-description">
        {locale === 'zh' && descriptionsZh[item.name] ? descriptionsZh[item.name] : item.description}
      </p>
      {locale === 'zh' && !descriptionsZh[item.name] && (
        <p className="uie-original-note">以上为上游原始说明；组件名称、导航与操作已中文化。</p>
      )}
      <ItemGuide item={item} />
      <div className="uie-detail-tabs" role="tablist" aria-label={t('组件详情', 'Component details')}>
        {[
          ['preview', t('效果预览', 'Preview'), Play],
          ['source', t('组件源码', 'Source'), Code2],
          ['prompt', t('原版提示词', 'Original prompt'), Sparkles]
        ].map(([key, label, Icon]) => (
          <button
            role="tab"
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            key={key}
            id={`tab-${key}`}
            onClick={() => setTab(key)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
      <section className="uie-detail-panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'preview' && (
          <>
            <div className="uie-preview-top">
              <span>
                <i />{' '}
                {phase === 'completed'
                  ? t('体验已结束', 'Session finished')
                  : t('可直接点击、拖动或调整参数', 'Click, drag or adjust the parameters')}
              </span>
              {phase === 'playing' && (
                <button onClick={() => setPhase('completed')}>{t('结束本次体验', 'Finish session')}</button>
              )}
            </div>
            {phase === 'playing' ? (
              <iframe
                ref={frameRef}
                key={`${item.id}-${round}-${locale}`}
                className="uie-demo-frame"
                title={`${item.name} ${t('交互演示', 'interactive demo')}`}
                src={`/preview${item.path}?lang=${locale}`}
                sandbox="allow-scripts allow-same-origin"
                allow="fullscreen"
              />
            ) : (
              <div className="uie-completed">
                <RotateCcw size={32} />
                <h2>{t('再感受一次？', 'One more time?')}</h2>
                <p>{t('重新播放会重置本次演示的所有交互。', 'Replay starts a fresh interaction session.')}</p>
                <div>
                  <button
                    className="uie-action primary"
                    onClick={() => {
                      setRound(x => x + 1);
                      setPhase('playing');
                    }}
                  >
                    <Play size={16} />
                    {t('重新体验', 'Replay')}
                  </button>
                  <button className="uie-action" onClick={() => setTab('prompt')}>
                    <Sparkles size={16} />
                    {t('查看原版提示词', 'Original prompt')}
                  </button>
                  <button className="uie-action" onClick={() => setTab('source')}>
                    <Code2 size={16} />
                    {t('查看源码', 'View source')}
                  </button>
                </div>
              </div>
            )}
            <p className="uie-preview-note">
              {t(
                '循环与手势演示没有固定终点，可点击“结束本次体验”后重新播放。',
                'Looping and gesture demos have no fixed end. Finish the session to replay.'
              )}
            </p>
          </>
        )}
        {tab === 'source' && <SourcePanel item={item} />}
        {tab === 'prompt' && (
          <div className="uie-prompt">
            <div className="uie-prompt-heading">
              <h2>{t('React Bits 原版提示词', 'Original React Bits prompt')}</h2>
            </div>
            <p>
              {t(
                '使用上游 Copy prompt 的原始内容，包含当前演示配置、依赖、参数、完整源码与集成步骤。英文保持原文；中文翻译说明和步骤，代码及参数说明保留上游原文。',
                'Uses the upstream Copy prompt, including configured usage, dependencies, properties, full source and integration steps. English is unchanged; Chinese translates the instructions while preserving code and property descriptions.'
              )}
            </p>
            <div className="uie-prompt-languages" role="group" aria-label={t('提示词语言', 'Prompt language')}>
              <button
                className="uie-action"
                aria-pressed={promptLanguage === 'zh'}
                onClick={() => setPromptLanguage('zh')}
              >
                中文
              </button>
              <button
                className="uie-action"
                aria-pressed={promptLanguage === 'en'}
                onClick={() => setPromptLanguage('en')}
              >
                English
              </button>
              {originalPrompts && <span>{originalPrompts.variant}</span>}
            </div>
            {originalPrompts ? (
              <>
                <CopyButton
                  key={promptLanguage + originalPrompts.variant}
                  text={originalPrompts[promptLanguage]}
                  label={t('复制原版提示词', 'Copy original prompt')}
                />
                <pre tabIndex={0}>{originalPrompts[promptLanguage]}</pre>
              </>
            ) : promptFailed ? (
              <div className="uie-empty">
                <p>
                  {t(
                    '暂时无法读取此演示的原版提示词。可返回预览，或重新加载。',
                    'The demo prompt could not be read. Return to the preview or reload it.'
                  )}
                </p>
                <button
                  onClick={() => {
                    setPromptFailed(false);
                    setRound(x => x + 1);
                  }}
                >
                  {t('重新读取', 'Retry')}
                </button>
              </div>
            ) : (
              <>
                <p role="status">
                  {t('正在读取上游演示的原版提示词…', 'Reading the original prompt from the upstream demo…')}
                </p>
                <iframe
                  ref={frameRef}
                  key={`${item.id}-prompt-${round}`}
                  hidden
                  title="Original prompt loader"
                  src={`/preview${item.path}?lang=${locale}&promptOnly=1`}
                  sandbox="allow-scripts allow-same-origin"
                />
              </>
            )}
          </div>
        )}
      </section>
      <div className="uie-detail-footer">
        <span>
          {t('来源', 'Source')}：
          <a href={item.docsUrl} target="_blank" rel="noreferrer">
            React Bits / {item.name} ↗
          </a>
        </span>
        <a href={`/personal-registry/${item.name}.json`} target="_blank" rel="noreferrer">
          {t('机器可读条目', 'Machine-readable entry')} ↗
        </a>
      </div>
    </article>
  );
}
function NotFound() {
  const { t } = useLocale();
  return (
    <div className="uie-empty">
      <h1>404</h1>
      <p>{t('没有找到这个组件。', 'This component could not be found.')}</p>
      <Link to="/">{t('返回组件库', 'Back to collection')}</Link>
    </div>
  );
}

export default function PersonalApp() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/preview/:category/:subcategory"
            element={
              <DemoBoundary>
                <Suspense fallback={<p role="status">Loading demo…</p>}>
                  <DemoFrame />
                </Suspense>
              </DemoBoundary>
            }
          />
          <Route path="*" element={<Shell />} />
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  );
}
