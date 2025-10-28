import { useState } from 'react';
import { Languages, Check } from 'lucide-react';
import { useI18nStore } from '@/stores/i18nStore';
import { HeaderDropdownButton, HeaderDropdownMenu } from '@/components';
import type { Language } from '@/i18n/translations';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useI18nStore();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt-BR', label: t.language['pt-BR'], flag: '🇧🇷' },
    { code: 'en-US', label: t.language['en-US'], flag: '🇺🇸' },
    { code: 'es-ES', label: t.language['es-ES'], flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  const getButtonLabel = () => {
    return (
      <>
        <span className="text-base sm:text-lg">{currentLanguage?.flag}</span>
        <span className="hidden lg:inline">{currentLanguage?.label}</span>
      </>
    );
  };

  return (
    <div className="relative">
      <HeaderDropdownButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        icon={<Languages size={16} className="sm:w-[18px] sm:h-[18px]" />}
        label={getButtonLabel()}
        truncateLabel={false}
        ariaLabel={t.language.title}
      />

      <HeaderDropdownMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        width="w-52 sm:w-56"
        align="left"
      >
        <div className="p-2">
          <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            {t.language.title}
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code as string}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium text-white">{lang.label}</span>
              </div>
              {language === lang.code && (
                <Check size={18} className="text-primary" aria-label="Selected" />
              )}
            </button>
          ))}
        </div>
      </HeaderDropdownMenu>
    </div>
  );
}
