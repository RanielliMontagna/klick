import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Session, Solve, Penalty } from '../types';

interface SessionsStore {
  sessions: Session[];
  activeSessionId: string;
  
  // Sessões
  createSession: (name: string) => void;
  deleteSession: (id: string) => void;
  renameSession: (id: string, name: string) => void;
  setActiveSession: (id: string) => void;
  getActiveSession: () => Session | undefined;
  
  // Solves
  addSolve: (solve: Omit<Solve, 'id' | 'createdAt' | 'effectiveMs'>) => void;
  updateSolvePenalty: (solveId: string, penalty: Penalty) => void;
  deleteSolve: (solveId: string) => void;
  
  // Import/Export
  exportSessions: () => string;
  importSessions: (data: string, merge: boolean) => void;
}

// Cria sessão inicial
const initialSession: Session = {
  id: crypto.randomUUID(),
  name: 'Sessão 1',
  solves: [],
};

/**
 * Calcula o effectiveMs baseado no tempo e penalidade
 */
function calculateEffectiveMs(timeMs: number, penalty: Penalty): number {
  if (penalty === 'DNF') return Infinity;
  if (penalty === '+2') return timeMs + 2000;
  return timeMs;
}

export const useSessionsStore = create<SessionsStore>()(
  persist(
    (set, get) => ({
      sessions: [initialSession],
      activeSessionId: initialSession.id,

      createSession: (name) =>
        set((state) => {
          const newSession: Session = {
            id: crypto.randomUUID(),
            name,
            solves: [],
          };
          return {
            sessions: [...state.sessions, newSession],
            activeSessionId: newSession.id,
          };
        }),

      deleteSession: (id) =>
        set((state) => {
          const filtered = state.sessions.filter((s) => s.id !== id);
          // Se deletou a sessão ativa, muda para a primeira
          const newActiveId =
            state.activeSessionId === id && filtered.length > 0
              ? filtered[0].id
              : state.activeSessionId;
          return {
            sessions: filtered,
            activeSessionId: newActiveId,
          };
        }),

      renameSession: (id, name) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === id ? { ...s, name } : s
          ),
        })),

      setActiveSession: (id) => set({ activeSessionId: id }),

      getActiveSession: () => {
        const state = get();
        return state.sessions.find((s) => s.id === state.activeSessionId);
      },

      addSolve: (solveData) =>
        set((state) => {
          const effectiveMs = calculateEffectiveMs(
            solveData.timeMs,
            solveData.penalty
          );
          
          const newSolve: Solve = {
            ...solveData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            effectiveMs,
          };

          return {
            sessions: state.sessions.map((session) =>
              session.id === state.activeSessionId
                ? { ...session, solves: [...session.solves, newSolve] }
                : session
            ),
          };
        }),

      updateSolvePenalty: (solveId, penalty) =>
        set((state) => ({
          sessions: state.sessions.map((session) => ({
            ...session,
            solves: session.solves.map((solve) =>
              solve.id === solveId
                ? {
                    ...solve,
                    penalty,
                    effectiveMs: calculateEffectiveMs(solve.timeMs, penalty),
                  }
                : solve
            ),
          })),
        })),

      deleteSolve: (solveId) =>
        set((state) => ({
          sessions: state.sessions.map((session) => ({
            ...session,
            solves: session.solves.filter((s) => s.id !== solveId),
          })),
        })),

      exportSessions: () => {
        const state = get();
        return JSON.stringify(state.sessions, null, 2);
      },

      importSessions: (data, merge) => {
        try {
          const imported = JSON.parse(data) as Session[];
          set((state) => ({
            sessions: merge ? [...state.sessions, ...imported] : imported,
            activeSessionId: imported[0]?.id || state.activeSessionId,
          }));
        } catch (error) {
          console.error('Erro ao importar sessões:', error);
        }
      },
    }),
    {
      name: 'klick-sessions',
    }
  )
);
