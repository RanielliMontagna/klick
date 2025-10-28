import type { TimerState } from '../types';

interface InspectionDisplayProps {
  timeLeft: number;
  state: TimerState;
}

export function InspectionDisplay({ timeLeft, state }: InspectionDisplayProps) {
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
    if (isCritical) return 'DNF!';
    if (isDanger) return '+2!';
    return '';
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`text-6xl font-bold ${getColor()}`}>
        {Math.ceil(timeLeft)}s
      </div>
      {getMessage() && (
        <div className="text-3xl font-bold text-red-500 animate-pulse">
          {getMessage()}
        </div>
      )}
    </div>
  );
}
