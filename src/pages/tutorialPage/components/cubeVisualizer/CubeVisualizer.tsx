import { motion } from 'framer-motion';
import { ArrowRight, RotateCw, RotateCcw } from 'lucide-react';
import type { TutorialStep } from '@/stores/tutorialStore';

interface CubeVisualizerProps {
  step: TutorialStep;
}

// Simple cube face visualization with colored squares
function CubeFace({ colors, label }: { colors: string[]; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs text-text-secondary font-semibold">{label}</div>
      <div className="grid grid-cols-3 gap-0.5 bg-border p-1 rounded">
        {colors.map((color, index) => {
          const position = Math.floor(index / 3) * 3 + (index % 3);
          return (
            <div
              key={`${label}-pos${position}-${color}`}
              className="w-6 h-6 rounded-sm border border-border"
              style={{ backgroundColor: color }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Algorithm move indicator
function AlgorithmMove({ move, description }: { move: string; description: string }) {
  const isClockwise = !move.includes("'");
  const is180 = move.includes('2');

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 p-2 bg-surface rounded-lg border border-border"
    >
      <div className="flex items-center gap-1">
        <code className="text-sm font-mono font-bold text-primary">{move}</code>
        {is180 ? (
          <div className="flex">
            <RotateCw className="w-4 h-4 text-primary" />
            <RotateCw className="w-4 h-4 text-primary -ml-2" />
          </div>
        ) : isClockwise ? (
          <RotateCw className="w-4 h-4 text-primary" />
        ) : (
          <RotateCcw className="w-4 h-4 text-primary" />
        )}
      </div>
      <ArrowRight className="w-4 h-4 text-text-secondary" />
      <span className="text-xs text-text-secondary">{description}</span>
    </motion.div>
  );
}

export function CubeVisualizer({ step }: CubeVisualizerProps) {
  // Color palette for cube faces
  const WHITE = '#f0f0f0';
  const YELLOW = '#ffd500';
  const RED = '#ff3838';
  const BLUE = '#0051ba';
  const ORANGE = '#ff8c00';
  const GREEN = '#00d800';
  const GRAY = '#404040';

  switch (step) {
    case 'intro':
      return null;

    case 'whiteCross':
      return (
        <div className="bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-primary/20">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">🎯 Cruz Branca</div>
              <div className="text-sm text-text-secondary">Posicione as 4 arestas brancas</div>
            </div>
            <div className="flex gap-4 items-center justify-center flex-wrap">
              <CubeFace
                colors={[GRAY, WHITE, GRAY, WHITE, WHITE, WHITE, GRAY, WHITE, GRAY]}
                label="Face Branca"
              />
              <ArrowRight className="w-6 h-6 text-primary" />
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-text-secondary font-semibold">Centros Laterais</div>
                <div className="flex gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-6 h-6 rounded-sm border border-border"
                      style={{ backgroundColor: RED }}
                    />
                    <span className="text-[10px] text-text-secondary">R</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-6 h-6 rounded-sm border border-border"
                      style={{ backgroundColor: BLUE }}
                    />
                    <span className="text-[10px] text-text-secondary">F</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-6 h-6 rounded-sm border border-border"
                      style={{ backgroundColor: ORANGE }}
                    />
                    <span className="text-[10px] text-text-secondary">L</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-6 h-6 rounded-sm border border-border"
                      style={{ backgroundColor: GREEN }}
                    />
                    <span className="text-[10px] text-text-secondary">B</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-center text-text-secondary max-w-sm">
              💡 Alinhe cada aresta branca com o centro da cor correspondente nas faces laterais
            </div>
          </div>
        </div>
      );

    case 'whiteCorners':
      return (
        <div className="bg-linear-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-primary/20">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">🔺 Esquinas Brancas</div>
              <div className="text-sm text-text-secondary">Algoritmo: R U R'</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <AlgorithmMove move="R" description="90° horário" />
              <AlgorithmMove move="U" description="Topo horário" />
              <AlgorithmMove move="R'" description="90° anti-horário" />
            </div>
            <div className="flex gap-3 items-center">
              <div className="text-4xl">🔁</div>
              <div className="text-sm text-text-secondary">Repita 1-5 vezes até encaixar</div>
            </div>
          </div>
        </div>
      );

    case 'secondLayer':
      return (
        <div className="bg-linear-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-primary/20">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">📦 Segunda Camada</div>
              <div className="text-sm text-text-secondary">2 algoritmos: Esquerda e Direita</div>
            </div>
            <div className="grid grid-cols-1 gap-3 w-full max-w-md">
              <div className="bg-surface/50 rounded-lg p-3 border border-border">
                <div className="text-xs font-semibold text-primary mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  ESQUERDA
                </div>
                <code className="text-xs font-mono">U' L' U L U F U' F'</code>
              </div>
              <div className="bg-surface/50 rounded-lg p-3 border border-border">
                <div className="text-xs font-semibold text-primary mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  DIREITA
                </div>
                <code className="text-xs font-mono">U R U' R' U' F' U F</code>
              </div>
            </div>
          </div>
        </div>
      );

    case 'yellowCross':
      return (
        <div className="bg-linear-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-primary/20">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">✨ Cruz Amarela</div>
              <div className="text-sm text-text-secondary">F R U R' U' F'</div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-text-secondary font-semibold">Ponto</div>
                <CubeFace
                  colors={[GRAY, GRAY, GRAY, GRAY, YELLOW, GRAY, GRAY, GRAY, GRAY]}
                  label="•"
                />
                <div className="text-[10px] text-text-secondary">1× F R U R' U' F'</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-text-secondary font-semibold">Linha</div>
                <CubeFace
                  colors={[GRAY, GRAY, GRAY, YELLOW, YELLOW, YELLOW, GRAY, GRAY, GRAY]}
                  label="—"
                />
                <div className="text-[10px] text-text-secondary">1× F R U R' U' F'</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-text-secondary font-semibold">L</div>
                <CubeFace
                  colors={[GRAY, YELLOW, GRAY, GRAY, YELLOW, YELLOW, GRAY, GRAY, GRAY]}
                  label="⌐"
                />
                <div className="text-[10px] text-text-secondary">1× F R U R' U' F'</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-text-secondary font-semibold">Cruz ✓</div>
                <CubeFace
                  colors={[GRAY, YELLOW, GRAY, YELLOW, YELLOW, YELLOW, GRAY, YELLOW, GRAY]}
                  label="+"
                />
                <div className="text-[10px] text-green-500 font-semibold">Completo!</div>
              </div>
            </div>
            <div className="text-xs text-center text-text-secondary max-w-sm bg-surface/50 rounded-lg p-2 border border-border">
              💡 Execute o algoritmo até formar a cruz. Máximo 3 vezes.
            </div>
          </div>
        </div>
      );

    case 'yellowEdges':
      return (
        <div className="bg-linear-to-br from-yellow-500/10 to-green-500/10 rounded-xl p-4 border border-primary/20">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">🔄 Alinhar Aristas</div>
              <div className="text-sm text-text-secondary">R U R' U R U2 R'</div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center gap-2">
                <CubeFace
                  colors={[GRAY, YELLOW, GRAY, YELLOW, YELLOW, YELLOW, GRAY, YELLOW, GRAY]}
                  label="Cruz"
                />
                <div className="text-xs text-text-secondary">Desalinhada</div>
              </div>
              <div className="flex flex-col gap-1">
                <RotateCw className="w-6 h-6 text-primary" />
                <RotateCw className="w-6 h-6 text-primary" />
                <RotateCw className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <CubeFace
                  colors={[GRAY, YELLOW, GRAY, YELLOW, YELLOW, YELLOW, GRAY, YELLOW, GRAY]}
                  label="Cruz"
                />
                <div className="text-xs text-green-500 font-semibold">✓ Alinhada</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'yellowCorners':
      return (
        <div className="bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-primary/20">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">🔺 Posicionar Esquinas</div>
              <div className="text-sm text-text-secondary">U R U' L' U R' U' L</div>
            </div>
            <div className="bg-surface/50 rounded-lg p-3 border border-border max-w-sm">
              <div className="flex items-start gap-2">
                <div className="text-2xl">⚠️</div>
                <div className="text-xs text-text-secondary">
                  As esquinas podem estar giradas - apenas certifique-se de que as cores
                  correspondem às faces adjacentes
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'solveCorners':
      return (
        <div className="bg-linear-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-primary/20">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">🎉 Finalizar!</div>
              <div className="text-sm text-text-secondary">R' D' R D</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <AlgorithmMove move="R'" description="Anti-horário" />
              <AlgorithmMove move="D'" description="Base anti" />
              <AlgorithmMove move="R" description="Horário" />
              <AlgorithmMove move="D" description="Base" />
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 max-w-sm">
              <div className="flex items-start gap-2">
                <div className="text-xl">🚫</div>
                <div className="text-xs text-red-600 dark:text-red-400">
                  <strong>IMPORTANTE:</strong> Não gire o cubo! Apenas gire a face U entre esquinas.
                </div>
              </div>
            </div>
            <div className="text-4xl animate-bounce">🎊</div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
