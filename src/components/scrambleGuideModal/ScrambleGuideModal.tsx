import { AnimatePresence, motion } from 'framer-motion';
import { X, Book } from 'lucide-react';
import { useI18nStore } from '../../stores/i18nStore';

type ScrambleGuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ScrambleGuideModal = ({ isOpen, onClose }: ScrambleGuideModalProps) => {
  const { t } = useI18nStore();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const faceColors = {
    R: 'bg-red-500',
    L: 'bg-orange-500',
    U: 'bg-white',
    D: 'bg-yellow-400',
    F: 'bg-green-500',
    B: 'bg-blue-500',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-gray-800 p-6 shadow-xl"
            onKeyDown={handleKeyDown}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-bold text-white">{t.scramble.guideModal.title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                aria-label={t.actions.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Description */}
            <p className="mb-6 text-sm text-gray-300">{t.scramble.guideModal.description}</p>

            {/* Faces Section */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-white">
                {t.scramble.guideModal.faces.title}
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                {t.scramble.guideModal.faces.description}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(['R', 'L', 'U', 'D', 'F', 'B'] as const).map((face) => (
                  <div key={face} className="flex items-center gap-3 rounded-lg bg-gray-700 p-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded font-bold text-gray-900 ${faceColors[face]}`}
                    >
                      {face}
                    </div>
                    <span className="text-sm text-gray-200">
                      {t.scramble.guideModal.faces[face]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modifiers Section */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-white">
                {t.scramble.guideModal.modifiers.title}
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                {t.scramble.guideModal.modifiers.description}
              </p>
              <div className="space-y-3">
                <div className="rounded-lg bg-gray-700 p-3">
                  <div className="mb-1 font-mono text-lg font-bold text-blue-400">R</div>
                  <p className="text-sm text-gray-300">{t.scramble.guideModal.modifiers.none}</p>
                </div>
                <div className="rounded-lg bg-gray-700 p-3">
                  <div className="mb-1 font-mono text-lg font-bold text-blue-400">R'</div>
                  <p className="text-sm text-gray-300">{t.scramble.guideModal.modifiers.prime}</p>
                </div>
                <div className="rounded-lg bg-gray-700 p-3">
                  <div className="mb-1 font-mono text-lg font-bold text-blue-400">R2</div>
                  <p className="text-sm text-gray-300">{t.scramble.guideModal.modifiers.double}</p>
                </div>
              </div>
            </div>

            {/* Examples Section */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-white">
                {t.scramble.guideModal.examples.title}
              </h3>
              <div className="space-y-2">
                <div className="rounded-lg bg-gray-700 p-3">
                  <p className="text-sm text-gray-300">{t.scramble.guideModal.examples.R}</p>
                </div>
                <div className="rounded-lg bg-gray-700 p-3">
                  <p className="text-sm text-gray-300">{t.scramble.guideModal.examples.RPrime}</p>
                </div>
                <div className="rounded-lg bg-gray-700 p-3">
                  <p className="text-sm text-gray-300">{t.scramble.guideModal.examples.R2}</p>
                </div>
                <div className="rounded-lg bg-blue-900/30 border border-blue-500/30 p-3">
                  <p className="text-sm text-blue-200">{t.scramble.guideModal.examples.sequence}</p>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                {t.scramble.guideModal.tips.title}
              </h3>
              <div className="space-y-2 rounded-lg bg-green-900/20 border border-green-500/30 p-4">
                <p className="text-sm text-green-200">{t.scramble.guideModal.tips.tip1}</p>
                <p className="text-sm text-green-200">{t.scramble.guideModal.tips.tip2}</p>
                <p className="text-sm text-green-200">{t.scramble.guideModal.tips.tip3}</p>
                <p className="text-sm text-green-200">{t.scramble.guideModal.tips.tip4}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
