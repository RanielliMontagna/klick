import { AnimatePresence } from 'framer-motion';
import { ONBOARDING_STEPS } from '@/features/onboarding/config';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Spotlight } from './Spotlight';
import { OnboardingTooltip } from './OnboardingTooltip';

export function Onboarding() {
  const { isActive, currentStep } = useOnboardingStore();

  if (!isActive) {
    return null;
  }

  const stepConfig = ONBOARDING_STEPS[currentStep];

  return (
    <AnimatePresence mode="wait">
      <Spotlight key="spotlight" targetSelector={stepConfig.targetSelector} isActive={isActive} />
      <OnboardingTooltip key={`tooltip-${currentStep}`} step={currentStep} />
    </AnimatePresence>
  );
}
