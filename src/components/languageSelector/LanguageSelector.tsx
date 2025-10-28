import { useState, useRef, useEffect } from 'react';
import { Languages, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18nStore } from '@/stores/i18nStore';
import type { Language } from '@/i18n/translations';
import { slideDown } from '@/utils/animations';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useI18nStore();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt-BR', label: t.language['pt-BR'], flag: '🇧🇷' },
    { code: 'en-US', label: t.language['en-US'], flag: '🇺🇸' },
    { code: 'es-ES', label: t.language['es-ES'], flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background sm:px-4 sm:py-2.5"
        aria-label={t.language.title}
        aria-expanded={isOpen}
      >
        <Languages size={18} className="text-primary" />
        <span className="hidden sm:inline">{currentLanguage?.flag}</span>
        <span className="hidden md:inline">{currentLanguage?.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...slideDown}
            className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl bg-surface shadow-xl ring-1 ring-border"
          >
            <div className="p-2">
              <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                {t.language.title}
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code as string}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-hover focus:bg-surface-hover focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium text-text-primary">{lang.label}</span>
                  </div>
                  {language === lang.code && (
                    <Check size={18} className="text-primary" aria-label="Selected" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
