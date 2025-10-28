import { useState, useCallback } from 'react';

export function useScrambleBox(scramble: string) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(scramble);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [scramble]);

  return {
    copied,
    copyToClipboard,
  };
}
