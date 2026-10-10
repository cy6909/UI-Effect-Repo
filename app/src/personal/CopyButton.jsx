import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLocale } from './Locale';
import { copyText } from '../utils/aiExport';
export default function CopyButton({ text, label }) {
  const { t } = useLocale();
  const [status, setStatus] = useState('');
  return (
    <div>
      <button className="uie-action" onClick={async () => setStatus((await copyText(text)) ? 'ok' : 'error')}>
        {status === 'ok' ? <Check size={16} /> : <Copy size={16} />}
        {status === 'ok' ? t('已复制', 'Copied') : label}
      </button>
      {status === 'error' && (
        <p role="status">
          {t('复制受浏览器限制，请选择下方文本手动复制。', 'Clipboard unavailable. Select and copy the text below.')}
        </p>
      )}
    </div>
  );
}
