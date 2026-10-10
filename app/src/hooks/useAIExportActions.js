import { useLocale } from '../personal/Locale';
import { useCallback, useMemo, useState } from 'react';
import { Sparkles, FileCode2, Terminal, FileText } from 'lucide-react';
import { SiOpenai, SiClaude, SiVercel } from 'react-icons/si';
import { toast } from 'sonner';
import { generateCliCommands } from '../utils/cli';
import { useOptions } from '../components/context/OptionsContext/useOptions';
import { useInstallation } from './useInstallation';
import { copyText, openInAI, buildCompactPrompt, registryUrl } from '../utils/aiExport';

export function useAIExportActions({
  componentName,
  category,
  subcategory,
  fullPrompt,
  fullPromptZh,
  configuredUsage,
  componentSource,
  componentCss,
  dependencies
}) {
  const { t } = useLocale();
  const [done, setDone] = useState(null);
  const { languagePreset, stylePreset } = useOptions();
  const { cliTool, packageManager } = useInstallation();

  const installCommand = useMemo(() => {
    const commands = generateCliCommands(languagePreset, stylePreset, category, subcategory, dependencies);
    if (!commands) return '';
    const key = packageManager === 'npm' ? 'npx' : packageManager;
    return cliTool === 'jsrepo' ? commands.jsrepo[key] : commands.shadcn[key];
  }, [languagePreset, stylePreset, category, subcategory, dependencies, cliTool, packageManager]);

  const run = useCallback(async (key, text, message) => {
    if (!text) {
      toast.error('Nothing to copy for this component');
      return;
    }
    if (await copyText(text)) {
      setDone(key);
      toast.success(message);
      setTimeout(() => setDone(null), 2000);
    } else {
      toast.error('Could not copy to clipboard');
    }
  }, []);

  const copyItems = useMemo(() => {
    const sourceWithCss = componentCss
      ? `${componentSource}\n\n/* ---- ${componentName}.css ---- */\n${componentCss}`
      : componentSource;

    return [
      {
        key: 'prompt-zh',
        label: t('复制原版提示词 · 中文', 'Copy original prompt · Chinese'),
        icon: Sparkles,
        run: () => run('prompt-zh', fullPromptZh, t('中文提示词已复制', 'Chinese prompt copied'))
      },
      {
        key: 'prompt',
        label: t('复制原版提示词 · English', 'Copy original prompt · English'),
        icon: Sparkles,
        run: () => run('prompt', fullPrompt, 'Prompt copied — paste into any AI assistant')
      },
      {
        key: 'usage',
        label: t('复制使用示例', 'Copy configured code'),
        icon: FileText,
        run: () => run('usage', configuredUsage, 'Configured usage copied')
      },
      {
        key: 'source',
        label: t('复制组件源码', 'Copy component source'),
        icon: FileCode2,
        run: () => run('source', sourceWithCss, 'Component source copied')
      },
      {
        key: 'install',
        label: t('复制安装命令', 'Copy install command'),
        icon: Terminal,
        run: () => run('install', installCommand, 'Install command copied')
      }
    ];
  }, [componentName, componentCss, componentSource, fullPrompt, fullPromptZh, configuredUsage, installCommand, run, t]);

  const openItems = useMemo(() => {
    const compactPrompt = buildCompactPrompt({
      componentName,
      category,
      subcategory,
      language: languagePreset,
      style: stylePreset,
      installCommand,
      usage: configuredUsage
    });

    const payload = {
      prompt: compactPrompt,
      registryUrl: registryUrl(componentName, languagePreset, stylePreset)
    };

    return [
      { key: 'chatgpt', label: 'Open in ChatGPT', icon: SiOpenai },
      { key: 'claude', label: 'Open in Claude', icon: SiClaude },
      { key: 'v0', label: 'Open in v0', icon: SiVercel }
    ].map(item => ({ ...item, run: () => openInAI(item.key, payload) }));
  }, [componentName, category, subcategory, languagePreset, stylePreset, installCommand, configuredUsage]);

  return { copyItems, openItems, done };
}
