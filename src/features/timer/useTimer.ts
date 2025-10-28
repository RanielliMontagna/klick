import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimerState } from '@/types';

interface UseTimerReturn {
  state: TimerState;
  timeMs: number;
  inspectionTimeLeft: number;
  startInspection: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  reset: () => void;
}

export function useTimer(
  inspectionDuration: number = 15,
  onInspectionEnd?: (timeOverMs: number) => void,
): UseTimerReturn {
  const [state, setState] = useState<TimerState>('idle');
  const [timeMs, setTimeMs] = useState(0);
  const [inspectionTimeLeft, setInspectionTimeLeft] = useState(inspectionDuration);

  const startTimeRef = useRef<number>(0);
  const inspectionStartRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const inspectionIntervalRef = useRef<number | null>(null);
  const spaceKeyDownRef = useRef<boolean>(false);

  const updateTimer = useCallback(() => {
    if (state === 'running') {
      const now = performance.now();
      setTimeMs(Math.floor(now - startTimeRef.current));
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
  }, [state]);

  const startInspection = useCallback(() => {
    setState('inspection');
    inspectionStartRef.current = Date.now();
    setInspectionTimeLeft(inspectionDuration);
    setTimeMs(0);
  }, [inspectionDuration]);

  const startTimer = useCallback(() => {
    if (state === 'inspection') {
      const inspectionElapsed = (Date.now() - inspectionStartRef.current) / 1000;
      const timeOver = Math.max(0, inspectionElapsed - inspectionDuration);
      if (onInspectionEnd) {
        onInspectionEnd(timeOver * 1000);
      }

      if (inspectionIntervalRef.current) {
        clearInterval(inspectionIntervalRef.current);
        inspectionIntervalRef.current = null;
      }
    }

    setState('running');
    startTimeRef.current = performance.now();
    setTimeMs(0);
  }, [state, inspectionDuration, onInspectionEnd]);

  const stopTimer = useCallback(() => {
    if (state === 'running') {
      setState('stopped');
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, [state]);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space' && !e.repeat && !spaceKeyDownRef.current) {
        e.preventDefault();
        spaceKeyDownRef.current = true;

        if (state === 'running') {
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
          startInspection();
        } else if (state === 'inspection') {
          startTimer();
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
