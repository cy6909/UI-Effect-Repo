import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiCheck, FiCopy, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { useInstallation } from '../../../hooks/useInstallation';
import './QuickStart.css';

const TOOLS = ['shadcn', 'jsrepo'];
const RUNNERS = ['npx', 'pnpm dlx', 'bunx --bun', 'yarn dlx'];

const PKG_TO_RUNNER = { npm: 'npx', pnpm: 'pnpm dlx', bun: 'bunx --bun', yarn: 'yarn dlx' };
const RUNNER_TO_PKG = { npx: 'npm', 'pnpm dlx': 'pnpm', 'bunx --bun': 'bun', 'yarn dlx': 'yarn' };

const COMMANDS = {
  shadcn: runner => `${runner} shadcn@latest add @react-bits/Aurora-TS-TW`,
  jsrepo: runner => `${runner} jsrepo@latest add github/davidhaz/react-bits Aurora-TS-TW`
};

const IMPORT_TEXT = `import Aurora from './Aurora';`;
const RENDER_TEXT = `<Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} />`;

const IMPORT_TOKENS = [
  ['import', 'kw'],
  [' Aurora ', 'comp'],
  ['from', 'kw'],
  [' ', 'punc'],
  ["'./Aurora'", 'str'],
  [';', 'punc']
];

const RENDER_TOKENS = [
  ['<', 'punc'],
  ['Aurora', 'comp'],
  [' ', 'punc'],
  ['colorStops', 'attr'],
  ['={[', 'punc'],
  ['"#3A29FF"', 'str'],
  [', ', 'punc'],
  ['"#FF94B4"', 'str'],
  [', ', 'punc'],
  ['"#FF3232"', 'str'],
  [']}', 'punc'],
  [' />', 'punc']
];

const Tokens = ({ tokens }) =>
  tokens.map(([text, kind], i) => (
    <span key={i} className={`ln-qs-t-${kind}`}>
      {text}
    </span>
  ));

const QuickStart = () => {
  const { cliTool, setCliTool, packageManager, setPackageManager } = useInstallation();
  const [copiedStep, setCopiedStep] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);
  const timerRef = useRef(null);
  const dropRef = useRef(null);

  const runner = PKG_TO_RUNNER[packageManager] ?? 'npx';
  const command = COMMANDS[cliTool]?.(runner) ?? COMMANDS.shadcn(runner);

  const copy = useCallback((text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(index);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopiedStep(null), 2000);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    if (!dropOpen) return undefined;
    const onPointerDown = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [dropOpen]);

  const steps = [
    {
      label: 'Add the component',
      text: command,
      body: (
        <>
          <span className="ln-qs-prompt">~</span>
          <code className="ln-qs-cmd-text">{command}</code>
        </>
      )
    },
    {
      label: 'Import it',
      text: IMPORT_TEXT,
      body: (
        <code className="ln-qs-cmd-text">
          <Tokens tokens={IMPORT_TOKENS} />
        </code>
      )
    },
    {
      label: 'Render it',
      text: RENDER_TEXT,
      body: (
        <code className="ln-qs-cmd-text">
          <Tokens tokens={RENDER_TOKENS} />
        </code>
      )
    }
  ];

  return (
    <section className="ln-qs-section">
      <div className="ln-qs-inner">
        <div className="ln-qs-grid">
          <motion.div
            className="ln-qs-intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <h2 className="ln-qs-title">Get started in seconds</h2>
            <p className="ln-qs-subtitle">
              One command drops the component&apos;s source straight into your project. No config, no wrapper, no setup
              step.
            </p>

            <div className="ln-qs-footnote">
              <Link to="/get-started/installation" className="ln-qs-guide-btn">
                Installation guide
                <FiArrowRight size={14} />
              </Link>
              <p className="ln-qs-hint">Works with Vite, Next.js, Astro and Remix.</p>
            </div>
          </motion.div>

          <motion.div
            className="ln-qs-terminal-wrap"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="ln-qs-glow" />
            <div className="ln-qs-terminal">
              <div className="ln-qs-tab-bar">
                <div className="ln-qs-tabs">
                  {TOOLS.map(t => (
                    <button
                      key={t}
                      className={`ln-qs-tab${cliTool === t ? ' ln-qs-tab--active' : ''}`}
                      onClick={() => setCliTool(t)}
                      aria-pressed={cliTool === t}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="ln-qs-runner-dropdown" ref={dropRef}>
                  <button
                    className="ln-qs-runner-trigger"
                    onClick={() => setDropOpen(v => !v)}
                    aria-expanded={dropOpen}
                  >
                    {runner}
                    <FiChevronDown size={11} className={`ln-qs-caret${dropOpen ? ' open' : ''}`} />
                  </button>
                  <div className={`ln-qs-runner-menu${dropOpen ? ' open' : ''}`}>
                    {RUNNERS.map(r => (
                      <button
                        key={r}
                        className={`ln-qs-runner-item${runner === r ? ' active' : ''}`}
                        onClick={() => {
                          setPackageManager(RUNNER_TO_PKG[r]);
                          setDropOpen(false);
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <ol className="ln-qs-steps">
                {steps.map((step, i) => (
                  <li className="ln-qs-step" key={step.label}>
                    <span className="ln-qs-step-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="ln-qs-step-head">
                      <span className="ln-qs-step-label">{step.label}</span>
                    </div>
                    <div className="ln-qs-step-code">{step.body}</div>
                    <button
                      className={`ln-qs-copy${copiedStep === i ? ' ln-qs-copy--done' : ''}`}
                      onClick={() => copy(step.text, i)}
                      aria-label={`Copy: ${step.label}`}
                    >
                      {copiedStep === i ? <FiCheck size={13} /> : <FiCopy size={13} />}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuickStart;
