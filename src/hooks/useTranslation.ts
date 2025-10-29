
import { useMemo } from 'react';
import { useI18nStore } from '@/stores/i18nStore';

export function useTranslation() {
  const { t, language, setLanguage } = useI18nStore();

  const locale = useMemo(() => t, [t]);

  return {
    t: locale,
    language,
    setLanguage,
  };
}
