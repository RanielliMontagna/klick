import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderDropdownButtonProps {
  isOpen: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: ReactNode;
  truncateLabel?: boolean;
  maxWidth?: string;
  ariaLabel?: string;
}

export function HeaderDropdownButton({
  isOpen,
  onClick,
  icon,
  label,
  truncateLabel = true,
  maxWidth = 'max-w-20 sm:max-w-[120px] md:max-w-[180px]',
  ariaLabel,
}: HeaderDropdownButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg sm:rounded-xl transition-colors min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      aria-label={ariaLabel}
      aria-expanded={isOpen}
    >
      <span className="shrink-0 text-primary">{icon}</span>
      <span
        className={`text-xs sm:text-sm font-medium text-white inline-flex items-center gap-1.5 ${
          truncateLabel ? `truncate ${maxWidth} min-w-0` : ''
        }`}
      >
        {label}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="shrink-0"
      >
        <ChevronDown size={14} className="text-gray-400 sm:w-4 sm:h-4" />
      </motion.div>
    </button>
  );
}
