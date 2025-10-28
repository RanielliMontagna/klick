import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Keyboard, Trash2, HelpCircle, Settings, TrendingUp, Compass } from 'lucide-react';
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
  SettingsModal,
} from '@/components';
import { AdvancedStatsModal } from '@/components/advancedStatsModal';
import { Onboarding } from '@/components/onboarding';
import { useTimer } from '@/features/timer/useTimer';
import { generate3x3Scramble } from '@/features/scramble/generate3x3';
import { useSessionsStore } from '@/stores/sessionsStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useI18nStore } from '@/stores/i18nStore';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { useTheme } from '@/hooks/useTheme';
import { slideUp, fadeIn } from '@/utils/animations';
import { formatAverage } from '@/utils/formatStats';
import type { Penalty, Solve } from '@/types';

function App() {
  // Apply theme on mount
  useTheme();
  const [scramble, setScramble] = useState('');
  const [inspectionOvertime, setInspectionOvertime] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showStatsInfo, setShowStatsInfo] = useState(false);
  const [showSessionManager, setShowSessionManager] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedSolve, setSelectedSolve] = useState<Solve | null>(null);
  const [selectedSolveNumber, setSelectedSolveNumber] = useState(0);

  const { t } = useI18nStore();
  const { settings } = useSettingsStore();
  const { hasCompletedOnboarding, startOnboarding } = useOnboardingStore();
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

  const { state, timeMs, inspectionTimeLeft, reset } = useTimer({
    inspectionDuration: settings.inspectionDuration,
    soundsEnabled: settings.soundsEnabled,
    onInspectionEnd: (overtime) => {
      setInspectionOvertime(overtime);
    },
  });

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

  // Inicia onboarding para novos usuários
  useEffect(() => {
    if (!hasCompletedOnboarding) {
      // Pequeno delay para garantir que a UI está renderizada
      const timer = setTimeout(() => {
        startOnboarding();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasCompletedOnboarding, startOnboarding]);

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
        showSettings ||
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
    showSettings,
    selectedSolve,
  ]);

  const tourButton = import.meta.env.DEV ? (
    <button
      type="button"
      onClick={() => startOnboarding()}
      className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      aria-label={t.onboarding.skip}
      title="Tour"
    >
      <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="hidden md:inline whitespace-nowrap">Tour</span>
    </button>
  ) : null;

  const settingsButton = (
    <button
      type="button"
      onClick={() => setShowSettings(true)}
      className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      aria-label={t.settings.title}
    >
      <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="hidden md:inline whitespace-nowrap">{t.settings.title}</span>
    </button>
  );

  const advancedStatsButton = (
    <button
      type="button"
      onClick={() => setShowAdvancedStats(true)}
      className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/50 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      aria-label={t.stats.advanced}
    >
      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="hidden md:inline whitespace-nowrap">{t.stats.advanced}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.header
          className="sticky top-4 sm:top-6 z-40 mb-6 sm:mb-8 md:mb-12 w-full flex flex-col rounded-2xl border border-gray-800/60 bg-background/90 backdrop-blur px-3 sm:px-6 py-3 sm:py-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full flex flex-col gap-3 sm:gap-4">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="sm:hidden">
                  <Logo size="md" />
                </div>
                <div className="hidden sm:block">
                  <Logo size="lg" />
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base text-left max-w-2xl mt-1">
                  {t.app.tagline}
                </p>
              </div>
              <div className="flex w-full sm:w-auto items-center justify-start sm:justify-end gap-2 sm:gap-3 flex-wrap">
                <LanguageSelector />
                <SessionSwitcher
                  onManageClick={() => setShowSessionManager(true)}
                  data-onboarding="sessions"
                />
                {tourButton}
                {advancedStatsButton}
                {settingsButton}
              </div>
            </div>
          </div>
        </motion.header>

        <div className="mb-8 sm:mb-12" data-onboarding="scramble">
          <ScrambleBox scramble={scramble} onNewScramble={generateNewScramble} />
        </div>

        {/* Timer Area */}
        <div
          className="mb-8 sm:mb-12 min-h-[250px] sm:min-h-[300px] flex items-center justify-center"
          data-onboarding="timer"
        >
          <div className="w-full text-center">
            <InspectionDisplay timeLeft={inspectionTimeLeft} state={state} />
            <TimerDisplay timeMs={timeMs} state={state} />
          </div>
        </div>

        {/* Statistics Cards */}
        <motion.div
          className="mb-8 sm:mb-12"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          data-onboarding="stats"
        >
          {/* Header com título e ações */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">Estatísticas</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowStatsInfo(true)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                title={t.stats.help}
              >
                <HelpCircle size={18} />
                <span className="hidden sm:inline">{t.stats.help}</span>
              </button>
              <button
                type="button"
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
          <div className="bg-gray-800 rounded-xl p-4 sm:p-6" data-onboarding="shortcuts">
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

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      <AdvancedStatsModal isOpen={showAdvancedStats} onClose={() => setShowAdvancedStats(false)} />

      {/* Onboarding */}
      <Onboarding />

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
