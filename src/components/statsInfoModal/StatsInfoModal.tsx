import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, TrendingUp, Award, Trophy } from 'lucide-react';
import { useI18nStore } from '@/stores/i18nStore';
import { scale } from '@/utils/animations';

interface StatsInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: 'single' | 'ao5' | 'ao12' | 'bestAo5' | 'bestAo12';
}

export function StatsInfoModal({ isOpen, onClose }: StatsInfoModalProps) {
  const { t } = useI18nStore();

  const sections = [
    {
      id: 'single',
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      data: t.stats.info.single,
    },
    {
      id: 'ao5',
      icon: TrendingUp,
      color: 'text-gray-300',
      bgColor: 'bg-gray-700/50',
      data: t.stats.info.ao5,
    },
    {
      id: 'ao12',
      icon: TrendingUp,
      color: 'text-gray-300',
      bgColor: 'bg-gray-700/50',
      data: t.stats.info.ao12,
    },
    {
      id: 'bestAo5',
      icon: Award,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      data: t.stats.info.bestAo5,
    },
    {
      id: 'bestAo12',
      icon: Trophy,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      data: t.stats.info.bestAo12,
    },
  ];

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

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              variants={scale}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700 shrink-0">
                <h2 className="text-2xl font-bold text-white">{t.stats.info.title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors rounded-lg p-1 hover:bg-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-6 space-y-6">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div
                      key={section.id}
                      className={`rounded-xl p-5 ${section.bgColor} border border-gray-700`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`${section.color}`}>
                          <Icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white">{section.data.title}</h3>
                      </div>

                      <p className="text-gray-300 mb-3 leading-relaxed">
                        {section.data.description}
                      </p>

                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                        <p className="text-sm text-gray-400 font-mono whitespace-pre-line">
                          <span className="text-accent font-semibold">Exemplo:</span>
                          {'\n'}
                          {section.data.example}
                        </p>
                      </div>

                      {'rule' in section.data && section.data.rule && (
                        <div className="mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                          <p className="text-sm text-yellow-200">
                            <span className="font-semibold">⚠️ Regra:</span> {section.data.rule}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Penalties Section */}
                <div className="rounded-xl p-5 bg-red-500/10 border border-red-500/30">
                  <h3 className="text-lg font-bold text-white mb-4">
                    {t.stats.info.penalties.title}
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                      <p className="text-gray-300 text-sm">{t.stats.info.penalties.plus2}</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                      <p className="text-gray-300 text-sm">{t.stats.info.penalties.dnf}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-700 shrink-0">
                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg font-medium transition-colors"
                >
                  Entendi!
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
