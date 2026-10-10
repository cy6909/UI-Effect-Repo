import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { reactBitsDarkTheme, reactBitsLightTheme } from './shiki-themes';

const highlighterPromise = createHighlighterCore({
  themes: [reactBitsLightTheme, reactBitsDarkTheme],
  langs: [
    import('@shikijs/langs/jsx'),
    import('@shikijs/langs/tsx'),
    import('@shikijs/langs/css'),
    import('@shikijs/langs/shellscript'),
    import('@shikijs/langs/json')
  ],
  engine: createJavaScriptRegexEngine()
});

const LANGUAGE_ALIASES = {
  js: 'jsx',
  javascript: 'jsx',
  ts: 'tsx',
  typescript: 'tsx',
  bash: 'shellscript',
  sh: 'shellscript',
  shell: 'shellscript',
  zsh: 'shellscript'
};

export const highlightCode = async (code, language = 'jsx') => {
  const highlighter = await highlighterPromise;
  const lang = LANGUAGE_ALIASES[language] || language || 'jsx';

  return highlighter.codeToHtml(String(code), {
    lang,
    themes: {
      light: 'react-bits-light',
      dark: 'react-bits-dark'
    },
    defaultColor: false
  });
};
