import ItemGuide from './discovery/ItemGuide';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Download, Heart, Info, Play, RotateCcw, Sparkles } from 'lucide-react';
import { useLocale } from './Locale';
import { categoryLabels } from './catalog';
import CopyButton from './CopyButton';

const triggerLabels = {
  scroll: ['页面滚动', 'Scroll'],
  pointer: ['指针移动', 'Pointer'],
  hover: ['悬停', 'Hover'],
  click: ['点击', 'Click'],
  wheel: ['滚轮 / 拖动', 'Wheel / drag'],
  load: ['页面载入', 'Page load'],
  time: ['自动播放', 'Time']
};
const mobileLabels = {
  'touch-branch': ['含触控分支', 'Touch branch'],
  'width-branch': ['按宽度适配', 'Width-based behavior'],
  'css-responsive-only': ['CSS 响应式', 'CSS responsive']
};

export default function MotionPromptDetail({ item, saved, toggleSaved }) {
  const { locale, t } = useLocale();
  const [tab, setTab] = useState(() =>
    new URLSearchParams(window.location.search).get('view') === 'prompt' ? 'prompt' : 'preview'
  );
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(false);
  const [prompt, setPrompt] = useState(null);
  const [promptError, setPromptError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [ended, setEnded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const video = useRef(null);
  useEffect(() => {
    document.title = `${locale === 'zh' ? item.titleZh : item.name} · UI / Bits`;
  }, [item, locale]);
  useEffect(() => {
    const ac = new AbortController();
    setError(false);
    fetch(item.detailUrl, { signal: ac.signal })
      .then(r => {
        if (!r.ok) throw new Error('detail');
        return r.json();
      })
      .then(setDetail)
      .catch(e => {
        if (e.name !== 'AbortError') setError(true);
      });
    return () => ac.abort();
  }, [item.detailUrl, retry]);
  useEffect(() => {
    if (tab !== 'prompt' || !detail || prompt !== null) return;
    const ac = new AbortController();
    setPromptError(false);
    fetch(detail.prompt.url, { signal: ac.signal })
      .then(r => {
        if (!r.ok) throw new Error('prompt');
        return r.text();
      })
      .then(setPrompt)
      .catch(e => {
        if (e.name !== 'AbortError') setPromptError(true);
      });
    return () => ac.abort();
  }, [detail, tab, prompt, retry]);
  const replay = async () => {
    if (!video.current) return;
    video.current.currentTime = 0;
    setEnded(false);
    try {
      await video.current.play();
    } catch {
      setVideoError(true);
    }
  };
  const labels = values => values?.[locale === 'zh' ? 0 : 1];
  const motion = detail?.motion;
  return (
    <article className="uie-detail uie-motion-detail">
      <Link className="uie-back" to="/?source=motion-prompts">
        <ArrowLeft size={15} />
        {t('返回 Motion Prompts', 'Back to Motion Prompts')}
      </Link>
      <div className="uie-detail-heading">
        <div>
          <span className="uie-eyebrow">{labels(categoryLabels[item.category])} / MOTION PROMPTS</span>
          <h1>{locale === 'zh' ? item.titleZh : item.name}</h1>
          <p className="uie-detail-subtitle">
            {locale === 'zh' ? item.name : item.titleZh} <span>· {t('独立页面设计', 'Standalone page design')}</span>
          </p>
        </div>
        <button
          className={`uie-action ${saved.includes(item.id) ? 'selected' : ''}`}
          aria-pressed={saved.includes(item.id)}
          onClick={() => toggleSaved(item.id)}
        >
          <Heart size={16} />
          {saved.includes(item.id) ? t('已收藏', 'Saved') : t('收藏设计', 'Save design')}
        </button>
      </div>
      <p className="uie-detail-description">{item.description}</p>
      <p className="uie-original-note">
        {t(
          '上游原始说明 · 保留设计与行为描述，不另行编写复现内容。',
          'Original upstream description. Design and behavior are preserved without invented recreation instructions.'
        )}
      </p>
      <div className="uie-motion-facts">
        <span>
          {t('来源', 'Source')}{' '}
          <a href="https://motionprompts.dev" target="_blank" rel="noreferrer">
            motionprompts.dev ↗
          </a>
        </span>
        <span>
          {item.promptAccess === 'full'
            ? t('完整公开提示词', 'Full public prompt')
            : t('官方提示词预览', 'Official prompt excerpt')}
        </span>
        <span>{t('个人非商业使用', 'Personal noncommercial use')}</span>
      </div>
      <ItemGuide item={item} />
      <div className="uie-detail-tabs" role="tablist" aria-label={t('设计详情', 'Design details')}>
        {[
          ['preview', t('设计预览', 'Design preview'), Play],
          ['prompt', t('原版提示词', 'Original prompt'), Sparkles],
          ['integration', t('集成与来源', 'Integration & source'), Info]
        ].map(([key, label, Icon]) => (
          <button
            role="tab"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            key={key}
            onClick={() => setTab(key)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
      <section className="uie-detail-panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'preview' && (
          <div className="uie-motion-preview">
            <div className="uie-preview-top">
              <span>
                <i />
                {t('原站设计录像', 'Original design recording')}
              </span>
              <a href={item.demoUrl} target="_blank" rel="noreferrer">
                {t('打开交互演示', 'Open interactive demo')} ↗
              </a>
            </div>
            <div className="uie-motion-stage">
              {!videoError ? (
                <video
                  key={retry}
                  ref={video}
                  controls
                  playsInline
                  preload="none"
                  poster={item.posterUrl}
                  src={item.videoUrl}
                  onEnded={() => setEnded(true)}
                  onPlay={() => setEnded(false)}
                  onError={() => setVideoError(true)}
                  aria-label={t('Motion Prompts 设计录像', 'Motion Prompts design video')}
                />
              ) : (
                <div className="uie-empty">
                  <p>
                    {t(
                      '原站录像暂时无法载入。可以直接打开原站交互演示。',
                      'The upstream recording is unavailable. Open the original interactive demo instead.'
                    )}
                  </p>
                  <a className="uie-action" href={item.demoUrl} target="_blank" rel="noreferrer">
                    {t('打开原站', 'Open original')}
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              )}
            </div>
            <div className="uie-motion-controls">
              <button className="uie-action" onClick={replay} disabled={videoError}>
                <RotateCcw size={15} />
                {ended ? t('再看一次', 'Watch again') : t('从头播放', 'Play from start')}
              </button>
              <a className="uie-action primary" href={item.demoUrl} target="_blank" rel="noreferrer">
                <ArrowUpRight size={15} />
                {t('在原站体验交互', 'Interact on original site')}
              </a>
              <button className="uie-action" onClick={() => setTab('prompt')}>
                <Sparkles size={15} />
                {t('查看原版提示词', 'View original prompt')}
              </button>
            </div>
            <p className="uie-preview-note">
              {t(
                '录像与交互演示由 Motion Prompts 提供。原站不允许跨站嵌入交互页，因此完整交互在新标签页打开。',
                'Motion Prompts hosts the recording and interactive demo. The source does not allow cross-site framing, so full interaction opens in a new tab.'
              )}
            </p>
          </div>
        )}
        {tab === 'prompt' && (
          <div className="uie-prompt">
            <div className="uie-prompt-heading">
              <h2>{t('Motion Prompts 原版提示词', 'Original Motion Prompts prompt')}</h2>
              <span className="uie-status">
                {item.promptAccess === 'full'
                  ? t('完整公开 · English', 'Full public · English')
                  : t('官方预览 · English', 'Official excerpt · English')}
              </span>
            </div>
            <p>
              {item.promptAccess === 'full'
                ? t(
                    '来自官方公开分发，保留英文原文和代码，不添加或补造内容。',
                    'From the official public distribution, preserving the original English and code without invented additions.'
                  )
                : t(
                    '此条目在官方分发中仅提供预览。下面保留原始预览及其授权说明；完整提示词需在原站获取。',
                    'The official distribution provides an excerpt for this item. Its original excerpt and access notice are preserved below. Get the full prompt from the original provider.'
                  )}
            </p>
            {prompt !== null ? (
              <>
                <div className="uie-motion-controls">
                  <CopyButton
                    text={prompt}
                    label={
                      item.promptAccess === 'full'
                        ? t('复制原版提示词', 'Copy original prompt')
                        : t('复制公开预览', 'Copy public excerpt')
                    }
                  />
                  <a className="uie-action" download={`${item.slug}.md`} href={detail.prompt.url}>
                    <Download size={15} />
                    {t('下载原文', 'Download original')}
                  </a>
                  {item.promptAccess === 'preview' && (
                    <a className="uie-action" href={item.docsUrl} target="_blank" rel="noreferrer">
                      {t('查看原站获取方式', 'View original access options')} ↗
                    </a>
                  )}
                </div>
                <pre tabIndex={0}>{prompt}</pre>
                <p className="uie-original-note">
                  {t('快照来源', 'Snapshot source')}：
                  <a href={detail.prompt.distributionUrl} target="_blank" rel="noreferrer">
                    VanguardiaAI/motionprompts-mcp ↗
                  </a>
                </p>
              </>
            ) : error || promptError ? (
              <div className="uie-empty">
                <p>{t('内容读取失败。', 'Content could not load.')}</p>
                <button onClick={() => setRetry(x => x + 1)}>{t('重试', 'Retry')}</button>
              </div>
            ) : (
              <p role="status">{t('正在读取原文…', 'Loading original text…')}</p>
            )}
          </div>
        )}
        {tab === 'integration' && (
          <div className="uie-motion-integration">
            <h2>{t('集成这个设计之前', 'Before integrating this design')}</h2>
            <p>
              {t(
                'Motion Prompts 条目是完整页面演示，不是可直接导入的 React 包。官方分发不提供组件源码；本库保留设计、原版提示词和公开集成数据。',
                'Motion Prompts entries are standalone page demos, not drop-in React packages. The official distribution does not provide component source. This library preserves their designs, original prompts and public integration metadata.'
              )}
            </p>
            {motion && (
              <dl className="uie-motion-metadata">
                <div>
                  <dt>{t('触发方式', 'Trigger')}</dt>
                  <dd>{labels(triggerLabels[motion.trigger]) || motion.trigger || t('未提供', 'Not specified')}</dd>
                </div>
                <div>
                  <dt>{t('依赖', 'Dependencies')}</dt>
                  <dd>{detail.dependencies.join(', ') || t('原生 JS / CSS', 'Vanilla JS / CSS')}</dd>
                </div>
                <div>
                  <dt>{t('移动端', 'Mobile')}</dt>
                  <dd>
                    {labels(mobileLabels[motion.mobile_behavior?.kind]) ||
                      motion.mobile_behavior?.kind ||
                      t('未提供', 'Not specified')}
                  </dd>
                </div>
                <div>
                  <dt>{t('减少动态效果', 'Reduced motion')}</dt>
                  <dd>
                    {motion.mobile_behavior?.reduced_motion === true
                      ? t('上游声明支持', 'Upstream reports support')
                      : motion.mobile_behavior?.reduced_motion === false
                        ? t('上游未实现', 'Not implemented upstream')
                        : t('未知', 'Unknown')}
                  </dd>
                </div>
                <div>
                  <dt>{t('运动系统', 'Motion system')}</dt>
                  <dd>{motion.native_system || motion.cluster || '—'}</dd>
                </div>
                <div>
                  <dt>{t('原始分类', 'Original category')}</dt>
                  <dd>{item.sourceCategory}</dd>
                </div>
              </dl>
            )}
            <div className="uie-motion-callout">
              <strong>{t('素材与代码边界', 'Assets and code boundaries')}</strong>
              <p>
                {t(
                  '示例媒体仍在原站加载，未复制到本仓库。实际项目中应按原提示词替换素材，并隔离全局样式、滚动控制和卸载清理。未将上游验证声明视为本库逐项验收。',
                  'Demo media stays upstream and has not been copied into this repository. Follow the original prompt to replace assets, scope styles and manage scrolling and cleanup. Upstream validation claims are not local per-item acceptance.'
                )}
              </p>
            </div>
            <p>
              <a href="/motion-prompts/LICENSE.txt" target="_blank" rel="noreferrer">
                PolyForm Noncommercial 1.0.0 + attribution ↗
              </a>
            </p>
            <p>
              {t('署名', 'Attribution')}：
              <a href="https://motionprompts.dev" target="_blank" rel="noreferrer">
                motionprompts.dev · Vanguardia
              </a>
            </p>
            {error && (
              <button className="uie-action" onClick={() => setRetry(x => x + 1)}>
                {t('重新读取集成数据', 'Reload integration metadata')}
              </button>
            )}
          </div>
        )}
      </section>
      <div className="uie-detail-footer">
        <a href={item.docsUrl} target="_blank" rel="noreferrer">
          Motion Prompts / {item.name} ↗
        </a>
        <a href={item.detailUrl} target="_blank" rel="noreferrer">
          {t('机器可读条目', 'Machine-readable entry')} ↗
        </a>
      </div>
    </article>
  );
}
