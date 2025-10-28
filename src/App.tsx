import { useState, useEffect, useCallback } from 'react';
import { Keyboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { TimerDisplay } from './components/TimerDisplay';
import { ScrambleBox } from './components/ScrambleBox';
import { InspectionDisplay } from './components/InspectionDisplay';
import { useTimer } from './features/timer/useTimer';
import { generate3x3Scramble } from './features/scramble/generate3x3';
import { useSessionsStore } from './stores/sessionsStore';
import { useSettingsStore } from './stores/settingsStore';
import { useI18nStore } from './stores/i18nStore';
import { slideUp } from './utils/animations';
import type { Penalty } from './types';

function App() {
  const [scramble, setScramble] = useState('');
  const [inspectionOvertime, setInspectionOvertime] = useState(0);
  
  const { t } = useI18nStore();
  const { settings } = useSettingsStore();
  const { addSolve, updateSolvePenalty, getActiveSession } = useSessionsStore();
  
  const {
    state,
    timeMs,
    inspectionTimeLeft,
    reset,
  } = useTimer(settings.inspectionDuration, (overtime) => {
    setInspectionOvertime(overtime);
  });

  // Gera novo scramble
  const generateNewScramble = useCallback(() => {
    setScramble(generate3x3Scramble());
  }, []);

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
  }, [state, timeMs, scramble, inspectionOvertime, settings.autoInspectionPenalty, addSolve, generateNewScramble, reset]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const session = getActiveSession();
      const lastSolve = session?.solves[session.solves.length - 1];

      switch (e.key.toLowerCase()) {
        case 'n':
          e.preventDefault();
          generateNewScramble();
          break;
        case 'p':
          e.preventDefault();
          if (lastSolve) {
            const newPenalty = lastSolve.penalty === '+2' ? 'NONE' : '+2';
            updateSolvePenalty(lastSolve.id, newPenalty);
          }
          break;
        case 'd':
          e.preventDefault();
          if (lastSolve) {
            const newPenalty = lastSolve.penalty === 'DNF' ? 'NONE' : 'DNF';
            updateSolvePenalty(lastSolve.id, newPenalty);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [generateNewScramble, updateSolvePenalty, getActiveSession]);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header 
          className="mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            {t.app.title}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            {t.app.tagline}
          </p>
        </motion.header>

        {/* Scramble */}
        <div className="mb-8 sm:mb-12">
          <ScrambleBox 
            scramble={scramble} 
            onNewScramble={generateNewScramble}
          />
        </div>

        {/* Timer Area */}
        <div className="mb-8 sm:mb-12 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
          <div className="w-full text-center">
            <InspectionDisplay 
              timeLeft={inspectionTimeLeft} 
              state={state}
            />
            <TimerDisplay 
              timeMs={timeMs} 
              state={state}
            />
          </div>
        </div>

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
              <h3 className="text-base sm:text-lg font-semibold text-gray-300">{t.shortcuts.title}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded min-w-[70px] text-center text-xs sm:text-sm">ESPAÇO</kbd>
                <span className="text-gray-400 text-xs sm:text-sm">{t.shortcuts.space}</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded min-w-[70px] text-center text-xs sm:text-sm">N</kbd>
                <span className="text-gray-400 text-xs sm:text-sm">{t.shortcuts.newScramble}</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded min-w-[70px] text-center text-xs sm:text-sm">P</kbd>
                <span className="text-gray-400 text-xs sm:text-sm">{t.shortcuts.togglePlus2}</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded min-w-[70px] text-center text-xs sm:text-sm">D</kbd>
                <span className="text-gray-400 text-xs sm:text-sm">{t.shortcuts.toggleDNF}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
