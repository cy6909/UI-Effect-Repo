import { motion } from 'motion/react';
import { FiPackage, FiEdit3, FiShield } from 'react-icons/fi';
import './Ownership.css';

const POINTS = [
  {
    icon: FiPackage,
    title: 'No wrapper library',
    desc: 'Components use ogl, GSAP and friends directly, no react-bits dependency.'
  },
  {
    icon: FiEdit3,
    title: 'Edit anything',
    desc: 'It is your source now. Change the shader, the props, the styling, all of it.'
  },
  {
    icon: FiShield,
    title: 'No lock-in',
    desc: 'If this site vanished tomorrow, everything you already added keeps working.'
  }
];

const TREE = [
  { depth: 0, name: 'your-project', kind: 'dir' },
  { depth: 1, name: 'src', kind: 'dir' },
  { depth: 2, name: 'components', kind: 'dir' },
  { depth: 3, name: 'Aurora.jsx', kind: 'file', added: true, active: true },
  { depth: 3, name: 'Aurora.css', kind: 'file', added: true },
  { depth: 2, name: 'App.jsx', kind: 'file' },
  { depth: 1, name: 'package.json', kind: 'file' }
];

const CODE = [
  [
    ['import ', 'kw'],
    ['{ Renderer, Program, Mesh }', 'attr'],
    [' from ', 'kw'],
    ["'ogl'", 'str'],
    [';', 'punc']
  ],
  [
    ['import ', 'kw'],
    ['{ useEffect, useRef }', 'attr'],
    [' from ', 'kw'],
    ["'react'", 'str'],
    [';', 'punc']
  ],
  [],
  [
    ['export default function ', 'kw'],
    ['Aurora', 'comp'],
    ['({', 'punc']
  ],
  [
    ['  colorStops', 'attr'],
    [' = [', 'punc'],
    ["'#3A29FF'", 'str'],
    [', ', 'punc'],
    ["'#FF94B4'", 'str'],
    ['],', 'punc']
  ],
  [
    ['  speed', 'attr'],
    [' = ', 'punc'],
    ['1', 'num'],
    [',', 'punc']
  ],
  [
    ['  blend', 'attr'],
    [' = ', 'punc'],
    ['0.5', 'num'],
    [',', 'punc']
  ],
  [['}) {', 'punc']],
  [
    ['  const ', 'kw'],
    ['ref', 'attr'],
    [' = ', 'punc'],
    ['useRef', 'comp'],
    ['(', 'punc'],
    ['null', 'kw'],
    [');', 'punc']
  ],
  [],
  [
    ['  return ', 'kw'],
    ['<canvas', 'comp'],
    [' ref', 'attr'],
    ['={ref}', 'punc'],
    [' className', 'attr'],
    ['=', 'punc'],
    ['"aurora"', 'str'],
    [' />;', 'punc']
  ],
  [['}', 'punc']]
];

const EASE = [0.21, 0.47, 0.32, 0.98];

const Ownership = () => (
  <section className="ln-own-section">
    <div className="ln-own-inner">
      <div className="ln-own-grid">
        <motion.div
          className="ln-own-visual"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div
            className="ln-own-window"
            role="img"
            aria-label="An editor showing Aurora.jsx added to your own project as plain, editable source that imports ogl directly"
          >
            <div className="ln-own-tabs">
              <span className="ln-own-tab is-active">Aurora.jsx</span>
              <span className="ln-own-tab">Aurora.css</span>
            </div>

            <div className="ln-own-body">
              <div className="ln-own-tree">
                {TREE.map(row => (
                  <div
                    className={`ln-own-tree-row${row.added ? ' is-added' : ''}${row.active ? ' is-active' : ''}`}
                    key={row.name}
                    style={{ paddingLeft: `${8 + row.depth * 11}px` }}
                  >
                    <span className="ln-own-tree-name">
                      {row.name}
                      {row.kind === 'dir' ? '/' : ''}
                    </span>
                  </div>
                ))}
              </div>

              <div className="ln-own-code">
                {CODE.map((line, i) => (
                  <div className="ln-own-code-line" key={i}>
                    <span className="ln-own-code-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="ln-own-code-text">
                      {line.map(([text, kind], j) => (
                        <span className={`ln-own-t-${kind}`} key={j}>
                          {text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ln-own-status">
              <span className="ln-own-status-item">uses ogl directly</span>
              <span className="ln-own-status-item">no react-bits package</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="ln-own-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.07, ease: EASE }}
        >
          <h2 className="ln-own-title">The code is yours</h2>
          <p className="ln-own-subtitle">
            React Bits isn&apos;t a package you depend on. Each component lands in your repo as source you own.
          </p>

          <ul className="ln-own-points">
            {POINTS.map(({ icon: Icon, title, desc }) => (
              <li className="ln-own-point" key={title}>
                <span className="ln-own-point-icon" aria-hidden="true">
                  <Icon size={13} />
                </span>
                <h3 className="ln-own-point-title">{title}</h3>
                <p className="ln-own-point-desc">{desc}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Ownership;
