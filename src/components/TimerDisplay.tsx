import { Timer, Play, Square } from 'lucide-react';
import type { TimerState } from '../types';
import { useI18nStore } from '../stores/i18nStore';
import { formatTime } from '../utils/formatTime';

interface TimerDisplayProps {
  timeMs: number;
  state: TimerState;
}

export function TimerDisplay({ timeMs, state }: TimerDisplayProps) {
  const { t } = useI18nStore();

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

  const getStateIcon = () => {
    switch (state) {
      case 'idle':
        return <Timer size={32} className="text-gray-400" />;
      case 'inspection':
        return <Timer size={32} className="text-yellow-400 animate-pulse" />;
      case 'running':
        return <Play size={32} className="text-accent" />;
      case 'stopped':
        return <Square size={32} className="text-white" />;
      default:
        return null;
    }
  };

  const getStateText = () => {
    switch (state) {
      case 'idle':
        return t.timer.ready;
      case 'inspection':
        return t.timer.inspection;
      case 'running':
        return t.timer.running;
      case 'stopped':
        return t.timer.stopped;
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {state !== 'running' && state !== 'stopped' && (
        <div className="flex items-center gap-3">
          {getStateIcon()}
          <p className={`text-2xl font-semibold ${getStateColor()}`}>
            {getStateText()}
          </p>
        </div>
      )}

      <div className={`text-8xl font-bold tabular-nums ${getStateColor()}`}>
        {formatTime(timeMs)}
      </div>

      {state === 'idle' && (
        <p className="text-sm text-gray-500">
          {t.timer.holdSpace}
        </p>
      )}
    </div>
  );
}
