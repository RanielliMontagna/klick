import { Copy, RefreshCw, Check } from 'lucide-react';
import { useI18nStore } from '../stores/i18nStore';
import { useState } from 'react';

interface ScrambleBoxProps {
  scramble: string;
  onNewScramble: () => void;
}

export function ScrambleBox({ scramble, onNewScramble }: ScrambleBoxProps) {
  const { t } = useI18nStore();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(scramble);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-300">{t.scramble.title}</h2>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title={t.scramble.copy}
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-500" />
                  {t.scramble.copySuccess}
                </>
              ) : (
                <>
                  <Copy size={16} />
                  {t.scramble.copy}
                </>
              )}
            </button>
            <button
              onClick={onNewScramble}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-primary hover:bg-purple-600 rounded-lg transition-colors font-medium"
              title={`${t.scramble.new} (N)`}
            >
              <RefreshCw size={16} />
              {t.scramble.new}
            </button>
          </div>
        </div>
        
        <div className="font-mono text-2xl text-white break-words leading-relaxed">
          {scramble || t.scramble.generating}
        </div>
      </div>
    </div>
  );
}
