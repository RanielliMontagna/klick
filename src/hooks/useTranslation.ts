import { useI18nStore } from '../stores/i18nStore';

/**
 * Hook para acessar traduções de forma simplificada
 */
export function useTranslation() {
  const { t, language, setLanguage } = useI18nStore();
  
  return {
    t,
    language,
    setLanguage,
  };
}
