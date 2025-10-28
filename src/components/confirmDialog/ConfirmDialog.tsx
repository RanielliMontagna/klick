import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { scale } from '@/utils/animations';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'warning',
}: ConfirmDialogProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          iconColor: 'text-red-500',
          buttonVariant: 'danger' as const,
        };
      case 'warning':
        return {
          iconColor: 'text-yellow-500',
          buttonVariant: 'warning' as const,
        };
    }
  };

  const styles = getVariantStyles();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              variants={scale}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`${styles.iconColor} shrink-0`} size={24} />
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed">{message}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 p-6 border-t border-gray-700">
                <Button
                  onClick={onClose}
                  variant="secondary"
                  className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white border-none"
                >
                  {cancelText}
                </Button>
                <Button
                  onClick={handleConfirm}
                  variant={styles.buttonVariant}
                  className="flex-1 px-4 py-2.5"
                >
                  {confirmText}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
