import { useEffect, useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useInstallation } from '../../hooks/useInstallation';

const INSTALL_COMMANDS = {
  npm: 'npm install',
  pnpm: 'pnpm add',
  yarn: 'yarn add',
  bun: 'bun add'
};

const Dependencies = ({ dependencyList = [] }) => {
  const { packageManager } = useInstallation();
  const [copied, setCopied] = useState(false);
  const dependencies = useMemo(
    () => [...new Set(dependencyList.map(dependency => dependency.trim()).filter(Boolean))],
    [dependencyList]
  );
  const command = `${INSTALL_COMMANDS[packageManager] || INSTALL_COMMANDS.npm} ${dependencies.join(' ')}`;

  useEffect(() => {
    if (!copied) return undefined;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  if (dependencies.length === 0) return null;

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="dependencies-panel" aria-labelledby="dependencies-title">
      <div className="dependencies-summary">
        <h2 id="dependencies-title">Dependencies</h2>
        <p>
          {dependencies.length} required {dependencies.length === 1 ? 'package' : 'packages'}
        </p>
      </div>
      <div className="dependencies-command">
        <code title={command}>{command}</code>
        <button type="button" onClick={copyCommand} aria-label={copied ? 'Install command copied' : 'Copy install command'}>
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </section>
  );
};

export default Dependencies;
