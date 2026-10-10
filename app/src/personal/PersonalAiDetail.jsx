import ItemGuide from './discovery/ItemGuide';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Code2, Download, Heart, Info, Play, RotateCcw, Sparkles } from 'lucide-react';
import { useLocale } from './Locale';
import CopyButton from './CopyButton';

export default function PersonalAiDetail({ item, saved, toggleSaved }) {
  const { locale, t } = useLocale();
  const [tab, setTab] = useState('preview');
  const [playing, setPlaying] = useState(true);
  const [round, setRound] = useState(0);
  const [content, setContent] = useState(null);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    document.title = `${item.titleZh} · UI / Bits`;
  }, [item]);
  useEffect(() => {
    setContent(null);
    setFailed(false);
    const url = tab === 'source' ? item.sourceUrl : tab === 'prompt' ? item.promptUrl : null;
    if (!url) return;
    const ac = new AbortController();
    fetch(url, { signal: ac.signal })
      .then(r => {
        if (!r.ok) throw new Error('load');
        return r.text();
      })
      .then(setContent)
      .catch(e => {
        if (e.name !== 'AbortError') setFailed(true);
      });
    return () => ac.abort();
  }, [tab, item, retry]);
  return (
    <article className="uie-detail uie-personal-ai-detail">
      <Link className="uie-back" to="/?source=personal-ai">
        <ArrowLeft size={15} />
        {t('返回个人 AI 实现', 'Back to Personal AI')}
      </Link>
      <div className="uie-detail-heading">
        <div>
          <span className="uie-eyebrow">PERSONAL AI / {item.code}</span>
          <h1>{locale === 'zh' ? item.titleZh : item.name}</h1>
          <p className="uie-detail-subtitle">
            {t('我的 AI 实现归档', 'My AI implementation archive')} · HTML / CSS / JavaScript
          </p>
        </div>
        <button className="uie-action" aria-pressed={saved.includes(item.id)} onClick={() => toggleSaved(item.id)}>
          <Heart size={16} />
          {saved.includes(item.id) ? t('已收藏', 'Saved') : t('收藏', 'Save')}
        </button>
      </div>
      <p className="uie-detail-description">{locale === 'zh' ? item.description : item.descriptionEn}</p>
      <div className="uie-motion-facts">
        <span>{t('个人 AI 实现', 'Personal AI implementation')}</span>
        <span>{t('完整原型媒体', 'Complete prototype media')}</span>
        <a href={item.docsUrl} target="_blank" rel="noreferrer">
          {t('Notion 原始归档', 'Notion archive')} ↗
        </a>
      </div>
      <ItemGuide item={item} />
      <div className="uie-detail-tabs" role="tablist" aria-label={t('个人实现详情', 'Personal implementation details')}>
        {[
          ['preview', t('效果预览', 'Preview'), Play],
          ['source', t('HTML 源码', 'HTML source'), Code2],
          ['prompt', t('原始提示词', 'Original prompt'), Sparkles],
          ['about', t('实现记录', 'Provenance'), Info]
        ].map(([key, label, Icon]) => (
          <button
            key={key}
            role="tab"
            id={`ai-tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`ai-panel-${key}`}
            onClick={() => {
              if (tab !== key) {
                setContent(null);
                setFailed(false);
                setTab(key);
              }
            }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>
      <section className="uie-detail-panel" role="tabpanel" id={`ai-panel-${tab}`} aria-labelledby={`ai-tab-${tab}`}>
        {tab === 'preview' && (
          <>
            <div className="uie-preview-top">
              <span>
                <i />
                {t('可直接操作的原始 HTML', 'Interactive archived HTML')}
              </span>
              <button onClick={() => setPlaying(false)}>{t('结束本次体验', 'End preview')}</button>
            </div>
            {playing ? (
              <iframe
                className="uie-personal-frame"
                key={round}
                src={item.demoUrl}
                sandbox="allow-scripts"
                title={`${item.code} ${item.name}`}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="uie-empty">
                <p>{t('体验已结束', 'Preview ended')}</p>
              </div>
            )}
            <div className="uie-motion-controls">
              <button
                className="uie-action primary"
                onClick={() => {
                  setRound(x => x + 1);
                  setPlaying(true);
                }}
              >
                <RotateCcw size={15} />
                {t('重新体验', 'Replay')}
              </button>
              <a className="uie-action" href={item.demoUrl} target="_blank" rel="noreferrer">
                <ArrowUpRight size={15} />
                {t('独立窗口体验', 'Open standalone')}
              </a>
            </div>
          </>
        )}
        {(tab === 'source' || tab === 'prompt') && (
          <div className="uie-prompt">
            <h2>{tab === 'source' ? t('原始 HTML 文件', 'Original HTML file') : t('原始提示词', 'Original prompt')}</h2>
            {tab === 'source' && (
              <p>
                {/^M0[2-6]$/.test(item.code)
                  ? t(
                      'M02–M06 共用一份完整实验台源码。预览仅选择对应场景；下载文件保留全部五个效果和原始图片。',
                      'M02–M06 share the original five-scene workbench. The preview selects one scene; the download preserves all five effects and images.'
                    )
                  : t(
                      '保留用户提供文件的原始内容，包括内嵌媒体。',
                      'Preserves the original user-supplied file, including embedded media.'
                    )}
              </p>
            )}
            {tab === 'prompt' && !item.promptUrl ? (
              <div className="uie-empty">
                <p>
                  {t(
                    '归档未提供这份实现的独立原始提示词。现有 Skill 规范仍可在 Notion 查看。',
                    'No standalone original prompt was archived for this implementation. Its Skill specification remains in Notion.'
                  )}
                </p>
                <a className="uie-action" href={item.docsUrl} target="_blank" rel="noreferrer">
                  {t('查看原始记录', 'View original record')} ↗
                </a>
              </div>
            ) : content !== null ? (
              <>
                <div className="uie-motion-controls">
                  <CopyButton text={content} label={t('复制原文', 'Copy original')} />
                  <a className="uie-action" href={tab === 'source' ? item.sourceUrl : item.promptUrl} download>
                    <Download size={15} />
                    {t('下载完整文件', 'Download full file')}
                  </a>
                </div>
                <pre tabIndex={0}>{content}</pre>
              </>
            ) : failed ? (
              <button className="uie-action" onClick={() => setRetry(x => x + 1)}>
                {t('读取失败，重试', 'Loading failed. Retry')}
              </button>
            ) : (
              <p role="status">{t('正在读取…', 'Loading…')}</p>
            )}
          </div>
        )}
        {tab === 'about' && (
          <div className="uie-motion-integration">
            <h2>{t('保留真实的实现记录', 'Preserved implementation record')}</h2>
            <p>
              {t(
                '“个人 AI 实现”表示你的 AI 辅助实现版本。设计参考、提示词、字体和照片仍保留各自来源。',
                'Personal AI identifies your AI-assisted implementation. Design references, prompts, fonts and photographs retain their own origins.'
              )}
            </p>
            <dl className="uie-motion-metadata">
              {[
                [t('实现版本', 'Implementation'), item.provenance.runtime],
                [t('Agent / 模型', 'Agent / model'), t('未记录', 'Unknown')],
                [t('思考等级', 'Reasoning effort'), t('未记录', 'Unknown')],
                [
                  t('生成轮次 / 技能加载', 'Attempts / loaded skills'),
                  t('未记录，不标为一次无技能生成', 'Unknown; not verified as a first-pass, no-skills generation')
                ],
                [
                  t('验收状态', 'Acceptance'),
                  t('归档候选，非视觉定稿', 'Archived candidate, not final visual acceptance')
                ]
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p>
              {item.code === 'R01'
                ? t(
                    'Calendar Cards 使用完整离线 WAAPI 预览及十张替代照片，未冒充尚未验证的 GSAP/Vite 工程。原始提示词按用户提供文本保存。',
                    'Calendar Cards uses the complete offline WAAPI preview and ten substitute photos. It does not represent the unverified GSAP/Vite project. Its original prompt is preserved from the user-provided text.'
                  )
                : item.code === 'M01'
                  ? t(
                      'Montserrat 为归档中的字体候选，通过 Fontsource CDN 加载；数值使用固定演示日期。',
                      'Montserrat is the archived font candidate, loaded through Fontsource CDN. Values use a fixed demonstration date.'
                    )
                  : t(
                      '此处使用完整图片实验台，区别于 Notion 精简媒体预览。',
                      'This uses the complete-image workbench, distinct from the media-lite Notion preview.'
                    )}
            </p>
            <a href={item.provenance.reference} target="_blank" rel="noreferrer">
              {t('参考来源', 'Reference source')} ↗
            </a>
            <p>
              <a href="/personal-ai/NOTICE.txt" target="_blank" rel="noreferrer">
                {t('素材与来源说明', 'Asset and source notice')} ↗
              </a>
            </p>
          </div>
        )}
      </section>
      <div className="uie-detail-footer">
        <a href={item.detailUrl} target="_blank" rel="noreferrer">
          {t('机器可读条目与文件校验和', 'Machine-readable entry and file hashes')} ↗
        </a>
      </div>
    </article>
  );
}
