import { motion } from 'framer-motion';
import { SolveTable } from '@/components';
import { useI18nStore } from '@/stores/i18nStore';
import { fadeIn } from '@/utils/animations';

export function HistoryPage() {
  const { t } = useI18nStore();

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          {t.navigation.history}
        </h1>
        <p className="text-text-secondary">Veja todos os seus solves e acompanhe sua evolução</p>
      </div>

      <SolveTable onViewDetails={() => {}} />
    </motion.div>
  );
}
