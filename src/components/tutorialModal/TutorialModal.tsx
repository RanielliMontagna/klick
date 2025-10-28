import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { useTutorialModal } from './useTutorialModal';
import { CubeVisualizer } from './CubeVisualizer';
import { useI18nStore } from '../../stores/i18nStore';
import { translations } from '../../i18n/translations';
import type { TutorialStep } from '../../stores/tutorialStore';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

function TutorialStepContent({ step }: { step: TutorialStep }) {
  const { language } = useI18nStore();
  const tutorial = translations[language].tutorial;

  if (step === 'intro') {
    const intro = tutorial.intro;
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-xl">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{intro.title}</h3>
            <p className="text-text-secondary text-sm">{intro.difficulty}</p>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed">{intro.description}</p>
        <div className="space-y-2">
          <p className="font-semibold text-sm">{intro.whatYouWillLearn}</p>
          <ul className="space-y-2">
            {intro.topics.map((topic: string, index: number) => (
              <li key={`topic-${topic.substring(0, 10)}`} className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">{index + 1}.</span>
                <span className="text-text-secondary text-sm">{topic}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="text-sm">
            <span className="text-text-secondary">⏱️ </span>
            <span className="text-text-primary">{intro.timeEstimate}</span>
          </div>
        </div>
      </div>
    );
  }

  const stepData = tutorial[step as keyof typeof tutorial] as Record<
    string,
    string | string[] | Record<string, string>
  >;

  return (
    <div className="space-y-4">
      {/* Visual Cube Representation */}
      <CubeVisualizer step={step} />

      <div>
        <h3 className="text-2xl font-bold mb-2">{stepData.title as string}</h3>
        <p className="text-text-secondary leading-relaxed">{stepData.description as string}</p>
      </div>

      {stepData.goal && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm">
            <span className="font-semibold text-primary">🎯 </span>
            <span className="text-text-primary">{stepData.goal as string}</span>
          </p>
        </div>
      )}

      {stepData.algorithm && (
        <div className="bg-surface rounded-lg p-4 border border-border">
          <p className="text-xs text-text-secondary mb-2 uppercase tracking-wide">Algoritmo</p>
          <code className="text-lg font-mono text-primary font-semibold">
            {stepData.algorithm as string}
          </code>
        </div>
      )}

      {stepData.algorithms && (
        <div className="space-y-3">
          <p className="text-sm font-semibold">
            {(stepData.algorithms as Record<string, string>).title}
          </p>
          <div className="space-y-2">
            <div className="bg-surface rounded-lg p-3 border border-border">
              <p className="text-xs text-text-secondary mb-1">Esquerda:</p>
              <code className="text-sm font-mono text-primary">
                {(stepData.algorithms as Record<string, string>).left}
              </code>
            </div>
            <div className="bg-surface rounded-lg p-3 border border-border">
              <p className="text-xs text-text-secondary mb-1">Direita:</p>
              <code className="text-sm font-mono text-primary">
                {(stepData.algorithms as Record<string, string>).right}
              </code>
            </div>
          </div>
        </div>
      )}

      {stepData.patterns && (
        <div className="space-y-2">
          <p className="text-sm font-semibold">
            {(stepData.patterns as Record<string, string>).title}
          </p>
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>• {(stepData.patterns as Record<string, string>).dot}</li>
            <li>• {(stepData.patterns as Record<string, string>).line}</li>
            <li>• {(stepData.patterns as Record<string, string>).L}</li>
            <li>• {(stepData.patterns as Record<string, string>).cross}</li>
          </ul>
        </div>
      )}

      {stepData.steps && (
        <div className="space-y-2">
          <p className="text-sm font-semibold">Passos:</p>
          <ol className="space-y-2">
            {(stepData.steps as string[]).map((stepItem, index) => (
              <li key={stepItem.substring(0, 20)} className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">{index + 1}.</span>
                <span className="text-text-secondary text-sm">{stepItem}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {stepData.tips && (
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <p className="text-sm font-semibold mb-2">💡 Dicas:</p>
          <ul className="space-y-1 text-sm text-text-secondary">
            {(stepData.tips as string[]).map((tip) => (
              <li key={tip.substring(0, 20)}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}

      {stepData.tip && (
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <p className="text-sm">
            <span className="font-semibold">💡 Dica: </span>
            <span className="text-text-secondary">{stepData.tip as string}</span>
          </p>
        </div>
      )}

      {stepData.intuitive && (
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <p className="text-sm text-text-secondary">{stepData.intuitive as string}</p>
        </div>
      )}

      {stepData.important && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-sm">
            <span className="font-semibold text-red-500">⚠️ </span>
            <span className="text-text-primary">{stepData.important as string}</span>
          </p>
        </div>
      )}

      {stepData.congratulations && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
            {stepData.congratulations as string}
          </p>
        </div>
      )}
    </div>
  );
}

export function TutorialModal() {
  const {
    isOpen,
    currentStep,
    currentStepIndex,
    totalSteps,
    isFirstStep,
    isLastStep,
    progressPercentage,
    handleClose,
    handleNext,
    handlePrevious,
  } = useTutorialModal();

  const { language } = useI18nStore();
  const t = translations[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{t.tutorial.title}</h2>
                  <p className="text-sm text-text-secondary mt-1">
                    {t.tutorial.steps.title
                      .replace('{step}', String(currentStepIndex + 1))
                      .replace('{total}', String(totalSteps))}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 hover:bg-surface rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="px-6 pt-4">
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TutorialStepContent step={currentStep} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-border">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isFirstStep}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.tutorial.steps.navigation.previous}</span>
                  <span className="sm:hidden">Ant.</span>
                </button>

                <button
                  type="button"
                  onClick={isLastStep ? handleClose : handleNext}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  <span>
                    {isLastStep
                      ? t.tutorial.steps.navigation.finish
                      : t.tutorial.steps.navigation.next}
                  </span>
                  {!isLastStep && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
