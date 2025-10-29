import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { AdvancedStatsContent } from './components/advancedStats/AdvancedStatsContent';
import { PageHeader } from '@/components';
import { useI18nStore } from '@/stores/i18nStore';
import { fadeIn } from '@/utils';

export function StatsPage() {
  const { t } = useI18nStore();

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-6xl"
    >
      <PageHeader
        title={t.navigation.stats}
        description={t.pages.stats.description}
        icon={<TrendingUp className="w-8 h-8" />}
      />

      <div className="min-h-[600px]">
        <AdvancedStatsContent />
      </div>
    </motion.div>
  );
}
