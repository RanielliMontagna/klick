import { AlertTriangle, Clock } from 'lucide-react';
import type { TimerState } from '../types';
import { useI18nStore } from '../stores/i18nStore';

interface InspectionDisplayProps {
  timeLeft: number;
  state: TimerState;
}

export function InspectionDisplay({ timeLeft, state }: InspectionDisplayProps) {
  const { t } = useI18nStore();

  if (state !== 'inspection') return null;

  const isWarning = timeLeft <= 3;
  const isDanger = timeLeft > 15 && timeLeft <= 17;
  const isCritical = timeLeft > 17;

  const getColor = () => {
    if (isCritical) return 'text-red-500 animate-pulse';
    if (isDanger) return 'text-orange-500';
    if (isWarning) return 'text-yellow-500 animate-pulse';
    return 'text-accent';
  };

  const getMessage = () => {
    if (isCritical) return t.penalties.dnf;
    if (isDanger) return t.inspection.penaltyPlus2;
    return '';
  };

  const getIcon = () => {
    if (isCritical || isDanger) {
      return <AlertTriangle size={40} className={getColor()} />;
    }
    return <Clock size={40} className={getColor()} />;
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex items-center gap-3">
        {getIcon()}
        <div className={`text-6xl font-bold ${getColor()}`}>
          {Math.ceil(timeLeft)}s
        </div>
      </div>
      {getMessage() && (
        <div className="flex items-center gap-2 text-2xl font-bold text-red-500 animate-pulse">
          <AlertTriangle size={24} />
          {getMessage()}
        </div>
      )}
    </div>
  );
}
