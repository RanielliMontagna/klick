import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideDown } from '@/utils/animations';

interface HeaderDropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  align?: 'left' | 'right';
}

export function HeaderDropdownMenu({
  isOpen,
  onClose,
  children,
  width = 'w-64 sm:w-72',
  align = 'left',
}: HeaderDropdownMenuProps) {
  const alignmentClass = align === 'right' ? 'right-0 sm:left-0' : 'left-0 sm:right-0 sm:left-auto';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
            }}
            aria-label="Close menu"
            tabIndex={-1}
          />

          {/* Menu */}
          <motion.div
            variants={slideDown}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`absolute ${alignmentClass} top-full mt-2 ${width} bg-gray-800 border border-gray-700 rounded-lg sm:rounded-xl shadow-xl z-50 overflow-hidden`}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
