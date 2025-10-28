import { AnimatePresence, motion } from 'framer-motion';
import { X, TrendingUp, Target, Zap } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { EvolutionChart } from './EvolutionChart';
import { DistributionChart } from './DistributionChart';
import { useAdvancedStatsModal, type Tab } from './useAdvancedStatsModal';

type AdvancedStatsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AdvancedStatsModal({ isOpen, onClose }: AdvancedStatsModalProps) {
  const { t } = useTranslation();
  const { activeTab, setActiveTab, chartData, advancedStats, hasEnoughData } =
    useAdvancedStatsModal();

  const tabs: { id: Tab; label: string; icon: typeof TrendingUp }[] = [
    { id: 'evolution', label: t.advancedStats.tabs.evolution, icon: TrendingUp },
    { id: 'consistency', label: t.advancedStats.tabs.consistency, icon: Target },
    { id: 'performance', label: t.advancedStats.tabs.performance, icon: Zap },
  ];

  const getConsistencyLevel = (cv: number) => {
    if (cv < 10)
      return {
        label: t.advancedStats.consistency.coefficientOfVariation.excellent,
        color: 'text-green-400',
      };
    if (cv < 15)
      return {
        label: t.advancedStats.consistency.coefficientOfVariation.good,
        color: 'text-blue-400',
      };
    if (cv < 20)
      return {
        label: t.advancedStats.consistency.coefficientOfVariation.average,
        color: 'text-yellow-400',
      };
    return {
      label: t.advancedStats.consistency.coefficientOfVariation.needsWork,
      color: 'text-red-400',
    };
  };

  const consistencyLevel = getConsistencyLevel(advancedStats.consistency.coefficientOfVariation);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-surface rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-primary">{t.advancedStats.title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={t.advancedStats.close}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-700 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-3 border-b-2 transition-colors
                        ${isActive ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}
                      `}
                    >
                      <Icon size={18} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {!hasEnoughData && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <TrendingUp size={48} className="text-gray-400 mb-4" />
                    <p className="text-gray-300 mb-2">{t.advancedStats.evolution.noData}</p>
                    <p className="text-sm text-gray-400">{t.advancedStats.evolution.tip}</p>
                  </div>
                )}

                {hasEnoughData && (
                  <AnimatePresence mode="wait">
                    {activeTab === 'evolution' && (
                      <motion.div
                        key="evolution"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {t.advancedStats.evolution.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-6">
                            {t.advancedStats.evolution.description}
                          </p>
                        </div>
                        <EvolutionChart data={chartData} />
                      </motion.div>
                    )}

                    {activeTab === 'consistency' && (
                      <motion.div
                        key="consistency"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {t.advancedStats.consistency.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-6">
                            {t.advancedStats.consistency.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Standard Deviation */}
                          <div className="bg-gray-800 rounded-xl p-6">
                            <h4 className="text-lg font-semibold text-white mb-2">
                              {t.advancedStats.consistency.standardDeviation.title}
                            </h4>
                            <p className="text-sm text-gray-400 mb-4">
                              {t.advancedStats.consistency.standardDeviation.description}
                            </p>
                            <div className="text-3xl font-bold text-primary">
                              {(advancedStats.consistency.standardDeviation / 1000).toFixed(2)}
                              <span className="text-sm text-gray-400 ml-2">
                                {t.advancedStats.consistency.standardDeviation.value}
                              </span>
                            </div>
                          </div>

                          {/* Coefficient of Variation */}
                          <div className="bg-gray-800 rounded-xl p-6">
                            <h4 className="text-lg font-semibold text-white mb-2">
                              {t.advancedStats.consistency.coefficientOfVariation.title}
                            </h4>
                            <p className="text-sm text-gray-400 mb-4">
                              {t.advancedStats.consistency.coefficientOfVariation.description}
                            </p>
                            <div className="text-3xl font-bold text-primary mb-2">
                              {advancedStats.consistency.coefficientOfVariation.toFixed(2)}
                              <span className="text-sm text-gray-400 ml-2">
                                {t.advancedStats.consistency.coefficientOfVariation.value}
                              </span>
                            </div>
                            <div className={`text-sm font-medium ${consistencyLevel.color}`}>
                              {consistencyLevel.label}
                            </div>
                          </div>
                        </div>

                        {/* Interpretation */}
                        <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-blue-400 mb-2">
                            {t.advancedStats.consistency.interpretation.title}
                          </h4>
                          <p className="text-sm text-blue-200/80">
                            {t.advancedStats.consistency.interpretation.description}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'performance' && (
                      <motion.div
                        key="performance"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {t.advancedStats.performance.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-6">
                            {t.advancedStats.performance.description}
                          </p>
                        </div>

                        {/* Average TPS */}
                        <div className="bg-gray-800 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {t.advancedStats.performance.averageTPS.title}
                          </h4>
                          <p className="text-sm text-gray-400 mb-4">
                            {t.advancedStats.performance.averageTPS.description}
                          </p>
                          <div className="text-3xl font-bold text-primary mb-2">
                            {advancedStats.performance.averageTPS.toFixed(2)}
                            <span className="text-sm text-gray-400 ml-2">
                              {t.advancedStats.performance.averageTPS.value}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {t.advancedStats.performance.averageTPS.note}
                          </p>
                        </div>

                        {/* Distribution */}
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {t.advancedStats.performance.distribution.title}
                          </h4>
                          <p className="text-sm text-gray-400 mb-4">
                            {t.advancedStats.performance.distribution.description}
                          </p>
                          <DistributionChart
                            distribution={advancedStats.performance.distribution}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
