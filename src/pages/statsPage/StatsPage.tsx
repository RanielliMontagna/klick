import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { AdvancedStatsContent } from '@/components/advancedStatsModal/AdvancedStatsContent';
import { useI18nStore } from '@/stores/i18nStore';
import { fadeIn } from '@/utils/animations';

export function StatsPage() {
  const { t } = useI18nStore();

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">{t.navigation.stats}</h1>
        </div>
        <p className="text-text-secondary">Análise detalhada de performance e evolução</p>
      </div>

      <div className="min-h-[600px]">
        <AdvancedStatsContent />
      </div>
    </motion.div>
  );
}
