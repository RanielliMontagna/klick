import { AlertTriangle, X } from 'lucide-react';
import { Button, Modal } from '@/components/ui';

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      ariaLabel={title}
      backdropClassName="bg-black/60 backdrop-blur-sm"
      containerClassName="p-4"
      className="max-h-[90vh]"
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
    </Modal>
  );
}
