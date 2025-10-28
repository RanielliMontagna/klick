import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import { SettingsContent } from '@/components/settingsModal/SettingsContent';
import { useI18nStore } from '@/stores/i18nStore';
import { fadeIn } from '@/utils/animations';

export function SettingsPage() {
  const { t } = useI18nStore();

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            {t.navigation.settings}
          </h1>
          <p className="text-text-secondary">Configure o aplicativo conforme sua preferência</p>
        </div>
      </div>

      <SettingsContent />
    </motion.div>
  );
}
