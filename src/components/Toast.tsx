import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideInRight } from '../utils/animations';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    const size = 18;
    switch (type) {
      case 'success':
        return <CheckCircle size={size} className="text-green-500 shrink-0" />;
      case 'error':
        return <XCircle size={size} className="text-red-500 shrink-0" />;
      case 'warning':
        return <AlertCircle size={size} className="text-orange-500 shrink-0" />;
      default:
        return <Info size={size} className="text-blue-500 shrink-0" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900/90 border-green-700';
      case 'error':
        return 'bg-red-900/90 border-red-700';
      case 'warning':
        return 'bg-orange-900/90 border-orange-700';
      default:
        return 'bg-blue-900/90 border-blue-700';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md flex items-center gap-3 px-4 py-3 rounded-lg border ${getStyles()} shadow-lg backdrop-blur-sm z-50`}
        >
          {getIcon()}
          <p className="text-white font-medium text-sm sm:text-base flex-1">{message}</p>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className="ml-2 text-gray-300 hover:text-white transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
