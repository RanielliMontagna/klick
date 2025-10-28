import { motion } from 'framer-motion';
import { History as HistoryIcon } from 'lucide-react';
import { SolveTable, PageHeader } from '@/components';
import { useI18nStore } from '@/stores/i18nStore';
import { fadeIn } from '@/utils/animations';

export function HistoryPage() {
  const { t } = useI18nStore();

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mx-auto w-full max-w-6xl">
      <PageHeader
        title={t.navigation.history}
        description={t.pages.history.description}
        icon={<HistoryIcon className="w-8 h-8" />}
      />

      <SolveTable onViewDetails={() => {}} />
    </motion.div>
  );
}
