import { useState, useEffect, useCallback } from 'react';
import { TimerDisplay } from './components/TimerDisplay';
import { ScrambleBox } from './components/ScrambleBox';
import { InspectionDisplay } from './components/InspectionDisplay';
import { useTimer } from './features/timer/useTimer';
import { generate3x3Scramble } from './features/scramble/generate3x3';
import { useSessionsStore } from './stores/sessionsStore';
import { useSettingsStore } from './stores/settingsStore';
import type { Penalty } from './types';

function App() {
  const [scramble, setScramble] = useState('');
  const [inspectionOvertime, setInspectionOvertime] = useState(0);
  
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

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora se estiver em um input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateNewScramble, updateSolvePenalty, getActiveSession]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-2">
            Klick
          </h1>
          <p className="text-gray-400 text-lg">
            gire, clique, evolua.
          </p>
        </header>

        {/* Scramble */}
        <div className="mb-12">
          <ScrambleBox 
            scramble={scramble} 
            onNewScramble={generateNewScramble}
          />
        </div>

        {/* Timer Area */}
        <div className="mb-12 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
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
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-300">Atalhos</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded">ESPAÇO</kbd>
                <span className="text-gray-400">Iniciar/Parar</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded">N</kbd>
                <span className="text-gray-400">Novo scramble</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded">P</kbd>
                <span className="text-gray-400">Toggle +2</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded">D</kbd>
                <span className="text-gray-400">Toggle DNF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
