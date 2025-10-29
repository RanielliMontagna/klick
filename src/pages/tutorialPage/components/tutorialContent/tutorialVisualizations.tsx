import type { ReactNode } from 'react';
import { CUBE_COLORS, type CubeVisualizationConfig } from '@/components/cubeVisualizer';
import type { TutorialStep } from '@/stores/tutorialStore';

const { WHITE, YELLOW, BLUE, ORANGE, GREEN, RED, GRAY } = CUBE_COLORS;

type TutorialTranslation = (typeof import('@/i18n/translations').translations)['pt-BR']['tutorial'];

const WHITE_CROSS_FACE = [
  GRAY,
  WHITE,
  GRAY,
  WHITE,
  WHITE,
  WHITE,
  GRAY,
  WHITE,
  GRAY,
] as const;

const WHITE_CORNERS_FACE = [
  WHITE,
  GRAY,
  WHITE,
  GRAY,
  WHITE,
  GRAY,
  WHITE,
  GRAY,
  WHITE,
] as const;

const SECOND_LAYER_FRONT = [
  BLUE,
  BLUE,
  BLUE,
  GREEN,
  GREEN,
  GREEN,
  WHITE,
  WHITE,
  WHITE,
] as const;

const YELLOW_CROSS_FACE = [
  YELLOW,
  GRAY,
  YELLOW,
  GRAY,
  YELLOW,
  GRAY,
  YELLOW,
  GRAY,
  YELLOW,
] as const;

const YELLOW_EDGES_FACE = [
  YELLOW,
  YELLOW,
  YELLOW,
  GRAY,
  YELLOW,
  GRAY,
  YELLOW,
  YELLOW,
  YELLOW,
] as const;

const YELLOW_CORNERS_FACE = [
  GRAY,
  YELLOW,
  GRAY,
  YELLOW,
  YELLOW,
  YELLOW,
  GRAY,
  YELLOW,
  GRAY,
] as const;

const SOLVED_FRONT = [
  ORANGE,
  ORANGE,
  ORANGE,
  GREEN,
  GREEN,
  GREEN,
  WHITE,
  WHITE,
  WHITE,
] as const;

const SOLVED_TOP = [
  YELLOW,
  YELLOW,
  YELLOW,
  YELLOW,
  YELLOW,
  YELLOW,
  YELLOW,
  YELLOW,
  YELLOW,
] as const;

const SOLVED_SIDE = [
  RED,
  RED,
  RED,
  BLUE,
  BLUE,
  BLUE,
  WHITE,
  WHITE,
  WHITE,
] as const;

const splitLabelAndAlgorithm = (value: string): { label: string; algorithm: string } => {
  const [label, ...rest] = value.split(':');
  return {
    label: label.trim(),
    algorithm: rest.join(':').trim(),
  };
};

const buildSecondLayerContent = (algorithms: Record<string, string>): ReactNode => {
  const left = splitLabelAndAlgorithm(algorithms.left);
  const right = splitLabelAndAlgorithm(algorithms.right);

  return (
    <div className="w-full space-y-3">
      <p className="text-xs text-text-secondary font-semibold">{algorithms.title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[left, right].map((item) => (
          <div key={item.label} className="bg-surface/60 rounded-lg border border-border p-3">
            <p className="text-xs font-semibold text-primary mb-1">{item.label}</p>
            <code className="text-sm font-mono text-text-primary">{item.algorithm}</code>
          </div>
        ))}
      </div>
    </div>
  );
};

const buildPatternsContent = (patterns: Record<string, string>): ReactNode => {
  const { title, ...items } = patterns;

  return (
    <div className="w-full space-y-2">
      <p className="text-xs text-text-secondary font-semibold">{title}</p>
      <ul className="space-y-1 text-sm text-text-secondary">
        {Object.entries(items).map(([key, value]) => (
          <li key={key} className="bg-surface/50 border border-border rounded-lg px-3 py-2">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export function getTutorialVisualizationConfig(
  step: TutorialStep,
  tutorial: TutorialTranslation,
): CubeVisualizationConfig | undefined {
  switch (step) {
    case 'whiteCross':
      return {
        title: tutorial.whiteCross.title,
        subtitle: tutorial.whiteCross.goal,
        gradient: 'from-indigo-500/10 to-sky-500/10',
        faces: [
          {
            colors: [...WHITE_CROSS_FACE],
            label: '⬆️',
          },
        ],
        tip: tutorial.whiteCross.intuitive ?? tutorial.whiteCross.tips?.[0],
      };
    case 'whiteCorners':
      return {
        title: tutorial.whiteCorners.title,
        subtitle: tutorial.whiteCorners.algorithm,
        gradient: 'from-emerald-500/10 to-blue-500/10',
        faces: [
          {
            colors: [...WHITE_CORNERS_FACE],
            label: '⬆️',
          },
        ],
        tip: tutorial.whiteCorners.tip,
      };
    case 'secondLayer':
      return {
        title: tutorial.secondLayer.title,
        subtitle: tutorial.secondLayer.goal,
        gradient: 'from-amber-500/10 to-emerald-500/10',
        faces: [
          {
            colors: [...SECOND_LAYER_FRONT],
            label: '⬅️',
          },
        ],
        content: buildSecondLayerContent(tutorial.secondLayer.algorithms as Record<string, string>),
        tip: tutorial.secondLayer.tip,
      };
    case 'yellowCross':
      return {
        title: tutorial.yellowCross.title,
        subtitle: tutorial.yellowCross.algorithm,
        gradient: 'from-yellow-500/10 to-orange-500/10',
        faces: [
          {
            colors: [...YELLOW_CROSS_FACE],
            label: '⬆️',
          },
        ],
        content: buildPatternsContent(tutorial.yellowCross.patterns as Record<string, string>),
        tip: tutorial.yellowCross.tip,
      };
    case 'yellowEdges':
      return {
        title: tutorial.yellowEdges.title,
        subtitle: tutorial.yellowEdges.algorithm,
        gradient: 'from-yellow-500/10 to-emerald-500/10',
        faces: [
          {
            colors: [...YELLOW_EDGES_FACE],
            label: '⬆️',
          },
        ],
        tip: tutorial.yellowEdges.tip,
      };
    case 'yellowCorners':
      return {
        title: tutorial.yellowCorners.title,
        subtitle: tutorial.yellowCorners.algorithm,
        gradient: 'from-purple-500/10 to-blue-500/10',
        faces: [
          {
            colors: [...YELLOW_CORNERS_FACE],
            label: '⬆️',
          },
        ],
        tip: tutorial.yellowCorners.tip,
      };
    case 'solveCorners':
      return {
        title: tutorial.solveCorners.title,
        subtitle: tutorial.solveCorners.algorithm,
        gradient: 'from-green-500/10 to-blue-500/10',
        faces: [
          {
            colors: [...SOLVED_TOP],
            label: '⬆️',
          },
          {
            colors: [...SOLVED_FRONT],
            label: '⬅️',
          },
          {
            colors: [...SOLVED_SIDE],
            label: '➡️',
          },
        ],
        tip: tutorial.solveCorners.important,
      };
    default:
      return undefined;
  }
}
