import type { TimerState } from '../types';

interface TimerDisplayProps {
  timeMs: number;
  state: TimerState;
}

/**
 * Formata tempo em ms para mm:ss.SSS
 */
function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  }
  return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
}

export function TimerDisplay({ timeMs, state }: TimerDisplayProps) {
  const getStateColor = () => {
    switch (state) {
      case 'idle':
        return 'text-gray-400';
      case 'inspection':
        return 'text-yellow-400';
      case 'running':
        return 'text-accent';
      case 'stopped':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  const getStateText = () => {
    switch (state) {
      case 'idle':
        return 'Pressione ESPAÇO';
      case 'inspection':
        return 'Inspecionando...';
      case 'running':
        return '';
      case 'stopped':
        return '';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {state === 'idle' && (
        <p className="text-xl text-gray-400">{getStateText()}</p>
      )}
      
      {state === 'inspection' && (
        <p className="text-2xl text-yellow-400 font-semibold">{getStateText()}</p>
      )}

      <div className={`text-8xl font-bold tabular-nums ${getStateColor()}`}>
        {formatTime(timeMs)}
      </div>

      {state === 'idle' && (
        <p className="text-sm text-gray-500">
          Segure ESPAÇO para começar a inspeção
        </p>
      )}
    </div>
  );
}
