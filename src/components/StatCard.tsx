import type { LucideIcon } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent';
}

export function StatCard({ title, value, icon: Icon, variant = 'secondary' }: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary/20 border-primary/40';
      case 'accent':
        return 'bg-accent/20 border-accent/40';
      default:
        return 'bg-gray-800 border-gray-700';
    }
  };

  return (
    <div
      className={`rounded-xl p-4 border ${getVariantStyles()} transition-all hover:scale-105`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className="text-gray-400" />
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-white tabular-nums">
        {formatTime(value)}
      </p>
    </div>
  );
}
