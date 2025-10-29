import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { PageHeader } from '@/components';
import { Button, Card } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import { slideUp, staggerContainer } from '@/utils';
import { trainingCategories, trainingCases } from '@/features/training/cases';
import type { TrainingCategory } from '@/features/training/types';
import { TrainingCaseCard } from './components/TrainingCaseCard';

export function TrainingPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<TrainingCategory>('pll');

  const categoryCases = useMemo(
    () => trainingCases.filter((trainingCase) => trainingCase.category === activeCategory),
    [activeCategory],
  );

  const categoryContent = t.training.categories[activeCategory];

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title={t.training.title}
        description={t.pages.training.description}
        icon={<Dumbbell className="w-8 h-8" />}
      />

      <motion.div variants={slideUp} initial="initial" animate="animate">
        <div className="flex flex-wrap gap-2">
          {trainingCategories.map((category) => (
            <Button
              key={category}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={cn(
                'rounded-full border transition-all',
                activeCategory === category
                  ? 'border-primary bg-primary/15 text-primary shadow-sm'
                  : 'border-border text-text-secondary hover:text-text-primary hover:border-primary/40',
              )}
            >
              <span className="font-medium tracking-wide uppercase text-xs">
                {t.training.categories[category].label}
              </span>
            </Button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={slideUp} initial="initial" animate="animate">
        <Card variant="surface" className="space-y-2">
          <h2 className="text-lg font-semibold text-text-primary">
            {categoryContent.label}
          </h2>
          <p className="text-sm text-text-secondary">{categoryContent.description}</p>
          <p className="text-xs text-text-tertiary">{t.training.description}</p>
        </Card>
      </motion.div>

      <motion.div
        key={activeCategory}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-4 lg:grid-cols-2"
      >
        {categoryCases.map((trainingCase) => (
          <motion.div key={trainingCase.id} variants={slideUp}>
            <TrainingCaseCard trainingCase={trainingCase} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
