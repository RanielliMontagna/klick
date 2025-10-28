import { useEffect, useState, type ReactNode, type RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';
import { slideDown } from '@/utils/animations';

interface HeaderDropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  align?: 'left' | 'right';
  anchorRef?: RefObject<HTMLElement | null>;
}

export function HeaderDropdownMenu({
  isOpen,
  onClose,
  children,
  width = 'sm:w-64 sm:max-w-sm',
  align = 'left',
  anchorRef,
}: HeaderDropdownMenuProps) {
  const alignmentClass = align === 'right' ? 'right-0' : 'left-0';
  const EDGE_PADDING = 16;

  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [mobileStyles, setMobileStyles] = useState({
    top: 0,
    left: EDGE_PADDING,
    right: EDGE_PADDING,
    maxHeight: 0,
  });

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const updatePosition = () => {
      const viewport = window.visualViewport;
      const viewportWidth = viewport?.width ?? window.innerWidth;
      const viewportHeight = viewport?.height ?? window.innerHeight;
      const viewportOffsetTop = viewport?.offsetTop ?? 0;
      const viewportOffsetLeft = viewport?.offsetLeft ?? 0;
      const isMobile = viewportWidth < 640;

      setIsMobileViewport(isMobile);

      if (!isMobile || !anchorRef?.current) {
        return;
      }

      const anchorRect = anchorRef.current.getBoundingClientRect();
      const top = anchorRect.bottom + viewportOffsetTop + EDGE_PADDING;
      const left = viewportOffsetLeft + EDGE_PADDING;
      const right = viewportOffsetLeft + EDGE_PADDING;
      const availableHeight = viewportHeight - (anchorRect.bottom + EDGE_PADDING * 2);

      setMobileStyles({
        top,
        left,
        right,
        maxHeight: Math.max(200, availableHeight),
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    const viewport = window.visualViewport;
    viewport?.addEventListener('resize', updatePosition);
    viewport?.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      viewport?.removeEventListener('resize', updatePosition);
      viewport?.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen, anchorRef]);

  const menuPositionClass = isMobileViewport
    ? 'fixed inset-x-4 sm:inset-auto sm:static mt-0'
    : `absolute ${alignmentClass} top-full mt-2`;

  const widthClass = isMobileViewport ? 'w-auto max-w-full' : width;

  const mobileStyle = isMobileViewport
    ? {
        top: mobileStyles.top,
        left: mobileStyles.left,
        right: mobileStyles.right,
        maxHeight: mobileStyles.maxHeight > 0 ? `${mobileStyles.maxHeight}px` : undefined,
      }
    : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <Button
            onClick={onClose}
            variant="ghost"
            className="fixed inset-0 z-40 cursor-default p-0 rounded-none focus-visible:outline-none focus-visible:ring-0"
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
            className={`${menuPositionClass} ${widthClass} bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden`}
            style={mobileStyle}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
