import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { TutorialContent } from '@/components/tutorialModal/TutorialContent';
import { useI18nStore } from '@/stores/i18nStore';
import { fadeIn } from '@/utils/animations';

export function TutorialPage() {
  const { t } = useI18nStore();

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">{t.navigation.tutorial}</h1>
        </div>
        <p className="text-text-secondary">Aprenda o método CFOP passo a passo</p>
      </div>

      <div className="bg-surface rounded-xl p-6 shadow-sm">
        <TutorialContent />
      </div>
    </motion.div>
  );
}
