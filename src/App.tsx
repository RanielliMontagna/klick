import { useState, useEffect, useCallback } from 'react';
import { Keyboard, Trash2, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  TimerDisplay,
  ScrambleBox,
  InspectionDisplay,
  StatCard,
  SolveTable,
  SolveDetailsModal,
  SessionSwitcher,
  SessionManagerModal,
  Toast,
  ConfirmDialog,
  StatsInfoModal,
  PWAUpdatePrompt,
  Logo,
  LanguageSelector,
} from '@/components';
import { useTimer } from '@/features/timer/useTimer';
import { generate3x3Scramble } from '@/features/scramble/generate3x3';
import { useSessionsStore } from '@/stores/sessionsStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useI18nStore } from '@/stores/i18nStore';
import { slideUp, fadeIn } from '@/utils/animations';
import { formatAverage } from '@/utils/formatStats';
import type { Penalty, Solve } from '@/types';

function App() {
  const [scramble, setScramble] = useState('');
  const [inspectionOvertime, setInspectionOvertime] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showStatsInfo, setShowStatsInfo] = useState(false);
  const [showSessionManager, setShowSessionManager] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedSolve, setSelectedSolve] = useState<Solve | null>(null);
  const [selectedSolveNumber, setSelectedSolveNumber] = useState(0);

  const { t } = useI18nStore();
  const { settings } = useSettingsStore();
  const {
    addSolve,
    updateSolvePenalty,
    getActiveSession,
    clearCurrentSession,
    getSingle,
    getAo5,
    getAo12,
    getBestAo5,
    getBestAo12,
  } = useSessionsStore();

  const { state, timeMs, inspectionTimeLeft, reset } = useTimer(
    settings.inspectionDuration,
    (overtime) => {
      setInspectionOvertime(overtime);
    },
  );

  // Gera novo scramble
  const generateNewScramble = useCallback(() => {
    setScramble(generate3x3Scramble());
  }, []);

  // Handler para limpar sessão
  const handleClearSession = () => {
    clearCurrentSession();
    setShowSuccessToast(true);
  };

  // Handler para ver detalhes do solve
  const handleViewSolveDetails = (solve: Solve) => {
    const session = getActiveSession();
    if (session) {
      const solveNumber = session.solves.length - session.solves.indexOf(solve);
      setSelectedSolveNumber(solveNumber);
      setSelectedSolve(solve);
    }
  };

  // Gera scramble inicial
  useEffect(() => {
    generateNewScramble();
  }, [generateNewScramble]);

  // Salva o solve quando o timer para
  useEffect(() => {
    if (state === 'stopped' && timeMs > 0) {
      let penalty: Penalty = 'NONE';

      // Aplica penalidade automática de inspeção se habilitado
      if (settings.autoInspectionPenalty && inspectionOvertime > 0) {
        if (inspectionOvertime > 2000) {
          penalty = 'DNF';
        } else if (inspectionOvertime > 0) {
          penalty = '+2';
        }
      }

      addSolve({
        timeMs,
        penalty,
        scramble,
      });

      // Gera novo scramble após salvar
      setTimeout(() => {
        generateNewScramble();
        reset();
        setInspectionOvertime(0);
      }, 1000);
    }
  }, [
    state,
    timeMs,
    scramble,
    inspectionOvertime,
    settings.autoInspectionPenalty,
    addSolve,
    generateNewScramble,
    reset,
  ]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignora atalhos em inputs/textareas ou quando modais estão abertos
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        showClearConfirm ||
        showStatsInfo ||
        showSessionManager ||
        selectedSolve !== null
      ) {
        return;
      }

      const session = getActiveSession();
      const lastSolve =
        session?.solves && session.solves.length > 0
          ? session.solves[session.solves.length - 1]
          : null;

      switch (e.key.toLowerCase()) {
        case 'n':
          e.preventDefault();
          if (state === 'idle') {
            generateNewScramble();
          }
          break;
        case 'p':
          e.preventDefault();
          if (lastSolve && state === 'idle') {
            const newPenalty = lastSolve.penalty === '+2' ? 'NONE' : '+2';
            updateSolvePenalty(lastSolve.id, newPenalty);
          }
          break;
        case 'd':
          e.preventDefault();
          if (lastSolve && state === 'idle') {
            const newPenalty = lastSolve.penalty === 'DNF' ? 'NONE' : 'DNF';
            updateSolvePenalty(lastSolve.id, newPenalty);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    generateNewScramble,
    updateSolvePenalty,
    getActiveSession,
    state,
    showClearConfirm,
    showStatsInfo,
    showSessionManager,
    selectedSolve,
  ]);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.header
          className="top-4 sm:top-6 z-40 mb-6 sm:mb-8 md:mb-12 w-full flex flex-col items-center rounded-2xl border border-gray-800/60 bg-background/90 backdrop-blur px-3 sm:px-6 py-3 sm:py-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile: Stack vertically */}
          <div className="w-full flex flex-col gap-3 sm:hidden">
            <div className="flex items-center justify-between gap-2">
              <LanguageSelector />
              <SessionSwitcher onManageClick={() => setShowSessionManager(true)} />
            </div>
            <div className="flex justify-center">
              <Logo size="md" />
            </div>
          </div>

          {/* Desktop: Three columns */}
          <div className="hidden sm:flex w-full justify-between items-center gap-4">
            <div className="flex justify-start min-w-0 flex-1">
              <LanguageSelector />
            </div>
            <div className="flex justify-center shrink-0">
              <Logo size="lg" />
            </div>
            <div className="flex justify-end min-w-0 flex-1">
              <SessionSwitcher onManageClick={() => setShowSessionManager(true)} />
            </div>
          </div>

          <p className="text-muted-foreground text-xs sm:text-sm md:text-base mt-2 sm:mt-3 text-center max-w-2xl mx-auto">
            {t.app.tagline}
          </p>
        </motion.header>

        <div className="mb-8 sm:mb-12">
          <ScrambleBox scramble={scramble} onNewScramble={generateNewScramble} />
        </div>

        {/* Timer Area */}
        <div className="mb-8 sm:mb-12 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
          <div className="w-full text-center">
            <InspectionDisplay timeLeft={inspectionTimeLeft} state={state} />
            <TimerDisplay timeMs={timeMs} state={state} />
          </div>
        </div>

        {/* Statistics Cards */}
        <motion.div className="mb-8 sm:mb-12" variants={fadeIn} initial="hidden" animate="visible">
          {/* Header com título e ações */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">Estatísticas</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowStatsInfo(true)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                title={t.stats.help}
              >
                <HelpCircle size={18} />
                <span className="hidden sm:inline">{t.stats.help}</span>
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 rounded-lg transition-colors text-sm"
                title={t.stats.clear}
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">{t.stats.clear}</span>
              </button>
            </div>
          </div>

          {/* Cards de estatísticas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <StatCard label={t.stats.single} value={formatAverage(getSingle())} variant="primary" />
            <StatCard label={t.stats.ao5} value={formatAverage(getAo5())} variant="secondary" />
            <StatCard label={t.stats.ao12} value={formatAverage(getAo12())} variant="secondary" />
            <StatCard
              label={t.stats.bestAo5}
              value={formatAverage(getBestAo5())}
              variant="accent"
            />
            <StatCard
              label={t.stats.bestAo12}
              value={formatAverage(getBestAo12())}
              variant="accent"
            />
          </div>
        </motion.div>

        {/* Instruções */}
        <motion.div
          className="max-w-2xl mx-auto px-4 sm:px-0"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-gray-800 rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Keyboard size={18} className="text-gray-300 sm:w-5 sm:h-5" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-300">
                {t.shortcuts.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded min-w-[70px] text-center text-xs sm:text-sm">
                  ESPAÇO
                </kbd>
                <span className="text-gray-400 text-xs sm:text-sm">{t.shortcuts.space}</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded min-w-[70px] text-center text-xs sm:text-sm">
                  N
                </kbd>
                <span className="text-gray-400 text-xs sm:text-sm">{t.shortcuts.newScramble}</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded min-w-[70px] text-center text-xs sm:text-sm">
                  P
                </kbd>
                <span className="text-gray-400 text-xs sm:text-sm">{t.shortcuts.togglePlus2}</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded min-w-[70px] text-center text-xs sm:text-sm">
                  D
                </kbd>
                <span className="text-gray-400 text-xs sm:text-sm">{t.shortcuts.toggleDNF}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Solve Table */}
        <motion.div className="mt-8 sm:mt-12" variants={fadeIn} initial="hidden" animate="visible">
          <SolveTable onViewDetails={handleViewSolveDetails} />
        </motion.div>
      </div>

      {/* Modals */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleClearSession}
        title={t.stats.clearConfirmTitle}
        message={t.stats.clearConfirmMessage}
        confirmText={t.stats.clear}
        cancelText={t.actions.cancel}
        variant="danger"
      />

      <StatsInfoModal isOpen={showStatsInfo} onClose={() => setShowStatsInfo(false)} />

      <SolveDetailsModal
        isOpen={selectedSolve !== null}
        onClose={() => setSelectedSolve(null)}
        solve={selectedSolve}
        solveNumber={selectedSolveNumber}
      />

      <SessionManagerModal
        isOpen={showSessionManager}
        onClose={() => setShowSessionManager(false)}
      />

      {/* Toast */}
      {showSuccessToast && (
        <Toast
          message={t.stats.clearSuccess}
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}

      <PWAUpdatePrompt />
    </div>
  );
}

export default App;
