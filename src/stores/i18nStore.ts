import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language, TranslationKey } from '@/i18n/translations';
import { getTranslation } from '@/i18n/translations';

interface I18nStore {
  language: Language;
  t: TranslationKey;
  setLanguage: (lang: Language) => void;
}

export const useI18nStore = create<I18nStore>()(
  persist(
    (set) => ({
      language: 'pt-BR',
      t: getTranslation('pt-BR'),
      setLanguage: (lang) =>
        set({
          language: lang,
          t: getTranslation(lang),
        }),
    }),
    {
      name: 'klick-i18n',
    },
  ),
);
