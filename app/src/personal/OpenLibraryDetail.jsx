import ItemGuide from './discovery/ItemGuide';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Heart, RotateCcw } from 'lucide-react';
import { useLocale } from './Locale';
import CopyButton from './CopyButton';
import { sourceLabels } from './catalog';
import { promptKindLabels } from './open-libraries/resources';
export default function OpenLibraryDetail({ item, saved, toggleSaved }) {
  const { locale, t } = useLocale();
  const [tab, setTab] = useState('preview'),
    [detail, setDetail] = useState(null),
    [content, setContent] = useState(null),
    [error, setError] = useState(false),
    [retry, setRetry] = useState(0),
    [running, setRunning] = useState(false),
    [round, setRound] = useState(0);
  useEffect(() => {
    document.title = `${item.titleZh} · UI / Bits`;
    const ac = new AbortController();
    fetch(item.detailUrl, { signal: ac.signal })
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setDetail)
      .catch(e => {
        if (e.name !== 'AbortError') setError(true);
      });
    return () => ac.abort();
  }, [item, retry]);
  const asset = tab === 'prompt' ? detail?.prompt : tab === 'source' ? detail?.bundle : null;
  useEffect(() => {
    setContent(null);
    setError(false);
    if (!asset) return;
    const ac = new AbortController();
    fetch(asset.url, { signal: ac.signal })
      .then(r => {
        if (!r.ok) throw new Error();
        return r.text();
      })
      .then(setContent)
      .catch(e => {
        if (e.name !== 'AbortError') setError(true);
      });
    return () => ac.abort();
  }, [asset, retry]);
  return (
    <article className="uie-detail">
      <Link className="uie-back" to={`/?source=${item.source}`}>
        <ArrowLeft size={15} />
        {sourceLabels[item.source]}
      </Link>
      <div className="uie-detail-heading">
        <div>
          <span className="uie-eyebrow">{sourceLabels[item.source]}</span>
          <h1>{locale === 'zh' ? item.titleZh : item.name}</h1>
        </div>
        <button className="uie-action" aria-pressed={saved.includes(item.id)} onClick={() => toggleSaved(item.id)}>
          <Heart size={16} />
          {saved.includes(item.id) ? t('已收藏', 'Saved') : t('收藏', 'Save')}
        </button>
      </div>
      <p className="uie-detail-description">{item.description}</p>
      <div className="uie-motion-facts">
        <span>{promptKindLabels[item.promptKind]?.[locale === 'zh' ? 0 : 1]}</span>
        <span>
          {item.sourceAvailable
            ? t('原始源码可用', 'Original source available')
            : t('原站链接索引', 'Upstream link index')}
        </span>
      </div>
      <ItemGuide item={item} />
      <div className="uie-detail-tabs" role="tablist">
        {[
          ['preview', t('效果预览', 'Preview')],
          ['prompt', t('原始提示词', 'Original prompt')],
          ['source', t('源码与依赖', 'Source & dependencies')],
          ['about', t('来源说明', 'Source notes')]
        ].map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={key === tab}
            onClick={() => {
              if (tab !== key) {
                setContent(null);
                setError(false);
                setTab(key);
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <section className="uie-detail-panel">
        {tab === 'preview' && (
          <>
            <div className="uie-preview-top">
              <span>
                {item.previewMode === 'local'
                  ? t('上游原始实现 · 按需启动', 'Original upstream implementation · Start on demand')
                  : t('原站演示入口', 'Upstream demo')}
              </span>
              {running && <button onClick={() => setRunning(false)}>{t('结束本次体验', 'End preview')}</button>}
            </div>
            {item.previewMode === 'local' && running ? (
              <iframe
                key={round}
                className="uie-open-frame"
                sandbox="allow-scripts"
                src={item.demoUrl}
                title={item.name}
              />
            ) : (
              <div className="uie-empty">
                <p>
                  {item.previewMode === 'local'
                    ? t(
                        '点击开始后加载当前效果。可悬停、点击或滚动体验。',
                        'Start to load this effect, then hover, click or scroll.'
                      )
                    : t(
                        '此条目提供原始页面入口，可用的演示与说明以该页面为准。源码可用性在独立标签中标注。',
                        'Open the original page for available demos and documentation. Source availability is shown separately.'
                      )}
                </p>
                {item.previewMode === 'local' ? (
                  <button className="uie-action primary" onClick={() => setRunning(true)}>
                    {t('开始体验', 'Start preview')}
                  </button>
                ) : (
                  <a className="uie-action primary" href={item.docsUrl} target="_blank" rel="noreferrer">
                    {t('打开原始页面', 'Open original page')} ↗
                  </a>
                )}
              </div>
            )}
            {item.previewMode === 'local' && running && (
              <div className="uie-motion-controls">
                <button className="uie-action" onClick={() => setRound(x => x + 1)}>
                  <RotateCcw size={15} />
                  {t('重新体验', 'Replay')}
                </button>
              </div>
            )}
          </>
        )}
        {(tab === 'source' || tab === 'prompt') && (
          <div className="uie-prompt">
            <h2>
              {tab === 'prompt' ? t('上游原文', 'Original upstream text') : t('原始文件包', 'Original file bundle')}
            </h2>
            {!asset && detail ? (
              <p>
                {tab === 'prompt'
                  ? t(
                      '本次公开分发没有归档原始提示词。保留原站入口，不自行编写替代。',
                      'No original prompt is included in this public distribution. Use the upstream entry; no replacement is invented.'
                    )
                  : t(
                      '此官方仓库仅提供组件链接，未包含实现源码。',
                      'The official repository contains component links, not implementation source.'
                    )}
              </p>
            ) : content !== null ? (
              <>
                <div className="uie-motion-controls">
                  <CopyButton text={content} label={t('复制原文', 'Copy original')} />
                  <a className="uie-action" href={asset.url} download>
                    <Download size={15} />
                    {t('下载完整文件', 'Download full file')}
                  </a>
                </div>
                <pre tabIndex={0}>{content}</pre>
              </>
            ) : error ? (
              <button className="uie-action" onClick={() => setRetry(x => x + 1)}>
                {t('重试', 'Retry')}
              </button>
            ) : (
              <p role="status">{t('正在读取…', 'Loading…')}</p>
            )}
            <p className="uie-original-note">
              {t(
                '提示词保留上游语言；源码包保留依赖声明。未宣称经过独立模型一次复现。',
                'Prompts preserve their upstream language; source bundles preserve dependency declarations. No independent first-pass model reproduction is claimed.'
              )}
            </p>
          </div>
        )}
        {tab === 'about' && (
          <div className="uie-motion-integration">
            <h2>{t('来源与交付范围', 'Source and delivery scope')}</h2>
            <p>
              {item.source === 'motion-vault'
                ? t(
                    '采用 MotionVault MIT 源码和英文原始 Prompt。本库使用独立 React 19 预览环境，避免与现有组件依赖冲突；交互实现保留上游。',
                    'Uses MotionVault MIT source and original English prompts. An isolated React 19 environment preserves the upstream implementation.'
                  )
                : item.source === 'shadcn-studio'
                  ? t(
                      '采用官方 MIT registry 文件包。基础 shadcn 组件及 npm 依赖见包内声明；未把依赖声明说成已全部内置，也未自编 AI Prompt。',
                      'Uses official MIT registry bundles. Base shadcn and npm dependencies remain declared in each bundle; they are not claimed to be fully vendored. No AI prompt is invented.'
                    )
                  : t(
                      '采用官方 MIT README 中的链接目录。具体页面的源码、免费额度与许可须以原站为准，Pro 内容未复制。',
                      'Uses the official MIT README link index. Source availability, quotas and licenses remain subject to each upstream page. Pro content is not copied.'
                    )}
            </p>
            <p>
              {t('上游版本', 'Upstream commit')}: <code>{detail?.upstreamCommit}</code>
            </p>
            {detail && (
              <a href={detail.license} target="_blank" rel="noreferrer">
                MIT · {t('完整许可证', 'Full license')} ↗
              </a>
            )}
          </div>
        )}
      </section>
      <div className="uie-detail-footer">
        <a href={item.docsUrl} target="_blank" rel="noreferrer">
          {t('查看原始来源', 'View source')} ↗
        </a>
        <a href={item.detailUrl} target="_blank" rel="noreferrer">
          {t('AI 条目与校验和', 'AI entry and checksums')} ↗
        </a>
      </div>
    </article>
  );
}
