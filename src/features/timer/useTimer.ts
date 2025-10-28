import { useEffect, useRef, useState, useCallback } from 'react';
import type { TimerState } from '../../types';

interface UseTimerReturn {
  state: TimerState;
  timeMs: number;
  inspectionTimeLeft: number;
  startInspection: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  reset: () => void;
}

/**
 * Hook do Timer com máquina de estados
 * Estados: idle → inspection → running → stopped
 * 
 * Controles:
 * - Space bar: segurar para armar, soltar inicia
 * - Durante inspeção: Space inicia o timer
 * - Durante running: Space para o timer
 */
export function useTimer(
  inspectionDuration: number = 15,
  onInspectionEnd?: (timeOverMs: number) => void
): UseTimerReturn {
  const [state, setState] = useState<TimerState>('idle');
  const [timeMs, setTimeMs] = useState(0);
  const [inspectionTimeLeft, setInspectionTimeLeft] = useState(inspectionDuration);
  
  const startTimeRef = useRef<number>(0);
  const inspectionStartRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const inspectionIntervalRef = useRef<number | null>(null);
  const spaceKeyDownRef = useRef<boolean>(false);

  // Atualiza o timer durante o estado "running"
  const updateTimer = useCallback(() => {
    if (state === 'running') {
      const now = performance.now();
      setTimeMs(Math.floor(now - startTimeRef.current));
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
  }, [state]);

  // Inicia a inspeção
  const startInspection = useCallback(() => {
    setState('inspection');
    inspectionStartRef.current = Date.now();
    setInspectionTimeLeft(inspectionDuration);
    setTimeMs(0);
  }, [inspectionDuration]);

  // Inicia o cronômetro
  const startTimer = useCallback(() => {
    // Calcula tempo excedido de inspeção, se houver
    if (state === 'inspection') {
      const inspectionElapsed = (Date.now() - inspectionStartRef.current) / 1000;
      const timeOver = Math.max(0, inspectionElapsed - inspectionDuration);
      if (onInspectionEnd) {
        onInspectionEnd(timeOver * 1000);
      }
      
      // Limpa o intervalo de inspeção
      if (inspectionIntervalRef.current) {
        clearInterval(inspectionIntervalRef.current);
        inspectionIntervalRef.current = null;
      }
    }

    setState('running');
    startTimeRef.current = performance.now();
    setTimeMs(0);
  }, [state, inspectionDuration, onInspectionEnd]);

  // Para o cronômetro
  const stopTimer = useCallback(() => {
    if (state === 'running') {
      setState('stopped');
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, [state]);

  // Reseta o timer
  const reset = useCallback(() => {
    setState('idle');
    setTimeMs(0);
    setInspectionTimeLeft(inspectionDuration);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (inspectionIntervalRef.current) {
      clearInterval(inspectionIntervalRef.current);
      inspectionIntervalRef.current = null;
    }
  }, [inspectionDuration]);

  // Atualiza o contador de inspeção
  useEffect(() => {
    if (state === 'inspection') {
      inspectionIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - inspectionStartRef.current) / 1000;
        const timeLeft = Math.max(0, inspectionDuration - elapsed);
        setInspectionTimeLeft(timeLeft);
      }, 100);

      return () => {
        if (inspectionIntervalRef.current) {
          clearInterval(inspectionIntervalRef.current);
        }
      };
    }
  }, [state, inspectionDuration]);

  // Inicia a animação do timer quando em "running"
  useEffect(() => {
    if (state === 'running') {
      updateTimer();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [state, updateTimer]);

  // Gerencia o evento de teclado (Space bar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora se estiver em um input ou textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        spaceKeyDownRef.current = true;

        if (state === 'idle') {
          // Em idle: segurar space inicia inspeção ao soltar
          // Não faz nada no keydown
        } else if (state === 'inspection') {
          // Durante inspeção: space inicia o timer
          startTimer();
        } else if (state === 'running') {
          // Durante running: space para o timer
          stopTimer();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space' && spaceKeyDownRef.current) {
        e.preventDefault();
        spaceKeyDownRef.current = false;

        if (state === 'idle') {
          // Ao soltar space em idle: inicia inspeção
          startInspection();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [state, startInspection, startTimer, stopTimer]);

  return {
    state,
    timeMs,
    inspectionTimeLeft,
    startInspection,
    startTimer,
    stopTimer,
    reset,
  };
}
