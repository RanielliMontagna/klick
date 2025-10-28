import { useState, useCallback } from 'react';
import type { Solve } from '@/types';

interface PenaltyInfo {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function useSolveDetailsModal(solve: Solve | null) {
  const [copied, setCopied] = useState(false);

  const copyScramble = useCallback(() => {
    if (!solve) return;

    navigator.clipboard.writeText(solve.scramble);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [solve]);

  const formatFullDate = useCallback((isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }, []);

  const getPenaltyInfo = useCallback((): PenaltyInfo => {
    if (!solve) {
      return {
        label: 'Nenhuma',
        color: 'text-gray-400',
        bgColor: 'bg-gray-700',
        borderColor: 'border-gray-600',
      };
    }

    if (solve.penalty === 'DNF') {
      return {
        label: 'DNF (Did Not Finish)',
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500/30',
      };
    }

    if (solve.penalty === '+2') {
      return {
        label: '+2 segundos',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500/30',
      };
    }

    return {
      label: 'Nenhuma',
      color: 'text-gray-400',
      bgColor: 'bg-gray-700',
      borderColor: 'border-gray-600',
    };
  }, [solve]);

  return {
    copied,
    copyScramble,
    formatFullDate,
    penaltyInfo: getPenaltyInfo(),
  };
}
