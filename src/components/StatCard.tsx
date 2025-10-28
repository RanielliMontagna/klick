import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatTime } from '../utils/formatTime';
import { scale } from '../utils/animations';

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
    <motion.div
      variants={scale}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-lg sm:rounded-xl p-3 sm:p-4 border ${getVariantStyles()} transition-all`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className="text-gray-400 sm:w-5 sm:h-5" />
        <h3 className="text-xs sm:text-sm font-medium text-gray-400">{title}</h3>
      </div>
      <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">
        {formatTime(value)}
      </p>
    </motion.div>
  );
}
