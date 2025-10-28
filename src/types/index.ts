export type Penalty = 'NONE' | '+2' | 'DNF';

export type Solve = {
  id: string; // uuid
  timeMs: number; // tempo bruto em ms
  penalty: Penalty; // penalidade aplicada
  effectiveMs: number; // timeMs ajustado (+2) ou Infinity se DNF
  scramble: string; // notação 3x3
  createdAt: string; // ISO
};

export type Session = {
  id: string;
  name: string;
  solves: Solve[];
};

export type TimerState = 'idle' | 'inspection' | 'running' | 'stopped';

export type Settings = {
  inspectionDuration: number; // segundos
  soundsEnabled: boolean;
  autoInspectionPenalty: boolean; // aplicar +2/DNF automaticamente
  theme: 'dark';
};
