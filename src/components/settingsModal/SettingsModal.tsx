import { AnimatePresence, motion } from 'framer-motion';
import { Settings as SettingsIcon, X, Download, Upload, Sun, Moon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui';
import { useSettingsStore } from '@/stores/settingsStore';
import { useSessionsStore } from '@/stores/sessionsStore';
import { useI18nStore } from '@/stores/i18nStore';
import { useTheme } from '@/hooks/useTheme';

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ExportImportMessage = {
  type: 'success' | 'error';
  text: string;
} | null;

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { settings, updateSettings } = useSettingsStore();
  const { exportCurrentSession, exportAllSessions, importSessions } = useSessionsStore();
  const { t } = useI18nStore();
  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [message, setMessage] = useState<ExportImportMessage>(null);

  const handleInspectionDurationChange = (value: number) => {
    updateSettings({ inspectionDuration: value });
  };

  const handleSoundsToggle = () => {
    updateSettings({ soundsEnabled: !settings.soundsEnabled });
  };

  const handleAutoInspectionPenaltyToggle = () => {
    updateSettings({ autoInspectionPenalty: !settings.autoInspectionPenalty });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCurrent = () => {
    const json = exportCurrentSession();
    const timestamp = new Date().toISOString().split('T')[0];
    downloadFile(json, `klick-session-${timestamp}.json`);
    setMessage({ type: 'success', text: t.settings.exportImport.exportSuccess });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleExportAll = () => {
    const json = exportAllSessions();
    const timestamp = new Date().toISOString().split('T')[0];
    downloadFile(json, `klick-all-sessions-${timestamp}.json`);
    setMessage({ type: 'success', text: t.settings.exportImport.exportSuccess });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = importSessions(content, importMode);

      if (result.success) {
        setMessage({ type: 'success', text: t.settings.exportImport.importSuccess });
      } else {
        setMessage({
          type: 'error',
          text: `${t.settings.exportImport.importError} ${result.error || ''}`,
        });
      }
      setTimeout(() => setMessage(null), 5000);
    };
    reader.readAsText(file);

    // Reset input para permitir selecionar o mesmo arquivo novamente
    e.target.value = '';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-800 p-6 shadow-xl"
            onKeyDown={handleKeyDown}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-bold text-white">{t.settings.title}</h2>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-700"
                aria-label={t.actions.close}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Settings Form */}
            <div className="space-y-6">
              {/* Inspection Duration */}
              <div>
                <label
                  htmlFor="inspection-duration"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  {t.settings.inspectionDuration.label}
                </label>
                <p className="mb-3 text-xs text-gray-400">
                  {t.settings.inspectionDuration.description}
                </p>
                <div className="flex items-center gap-4">
                  <input
                    id="inspection-duration"
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={settings.inspectionDuration}
                    onChange={(e) => handleInspectionDurationChange(Number(e.target.value))}
                    className="flex-1 accent-blue-500"
                  />
                  <span className="w-16 text-right text-sm font-medium text-white">
                    {settings.inspectionDuration} {t.settings.inspectionDuration.seconds}
                  </span>
                </div>
              </div>

              {/* Sounds Enabled */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="sounds-enabled"
                    className="mb-1 block text-sm font-medium text-white"
                  >
                    {t.settings.soundsEnabled.label}
                  </label>
                  <p className="text-xs text-gray-400">{t.settings.soundsEnabled.description}</p>
                </div>
                <Button
                  id="sounds-enabled"
                  onClick={handleSoundsToggle}
                  variant="ghost"
                  size="icon"
                  className={`relative h-6 w-11 rounded-full transition-colors p-0 justify-start ${
                    settings.soundsEnabled ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                  aria-pressed={settings.soundsEnabled}
                  aria-label={t.settings.soundsEnabled.label}
                >
                  <motion.div
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md"
                    animate={{
                      left: settings.soundsEnabled ? '1.375rem' : '0.125rem',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </Button>
              </div>

              {/* Auto Inspection Penalty */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="auto-inspection-penalty"
                    className="mb-1 block text-sm font-medium text-white"
                  >
                    {t.settings.autoInspectionPenalty.label}
                  </label>
                  <p className="text-xs text-gray-400">
                    {t.settings.autoInspectionPenalty.description}
                  </p>
                </div>
                <Button
                  id="auto-inspection-penalty"
                  onClick={handleAutoInspectionPenaltyToggle}
                  variant="ghost"
                  size="icon"
                  className={`relative h-6 w-11 rounded-full transition-colors p-0 justify-start ${
                    settings.autoInspectionPenalty ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                  aria-pressed={settings.autoInspectionPenalty}
                  aria-label={t.settings.autoInspectionPenalty.label}
                >
                  <motion.div
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md"
                    animate={{
                      left: settings.autoInspectionPenalty ? '1.375rem' : '0.125rem',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </Button>
              </div>

              {/* Theme */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label htmlFor="theme" className="mb-1 block text-sm font-medium text-white">
                    {t.settings.theme.label}
                  </label>
                  <p className="text-xs text-gray-400">{t.settings.theme.description}</p>
                </div>
                <Button
                  id="theme"
                  onClick={toggleTheme}
                  variant="ghost"
                  size="icon"
                  className={`relative h-6 w-11 rounded-full transition-colors p-0 justify-start ${
                    theme === 'light' ? 'bg-yellow-500' : 'bg-blue-600'
                  }`}
                  aria-label={t.settings.theme.label}
                >
                  <motion.div
                    className="absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md"
                    animate={{
                      left: theme === 'light' ? '1.375rem' : '0.125rem',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    {theme === 'light' ? (
                      <Sun className="h-3 w-3 text-yellow-600" />
                    ) : (
                      <Moon className="h-3 w-3 text-blue-600" />
                    )}
                  </motion.div>
                </Button>
              </div>

              {/* Export/Import */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="mb-4 text-base font-semibold text-white">
                  {t.settings.exportImport.title}
                </h3>

                {/* Message feedback */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mb-4 rounded-lg p-3 text-sm ${
                      message.type === 'success'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                )}

                {/* Export buttons */}
                <div className="mb-4 space-y-2">
                  <Button
                    onClick={handleExportCurrent}
                    className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
                  >
                    <Download className="h-4 w-4" />
                    {t.settings.exportImport.exportCurrent}
                  </Button>
                  <Button
                    onClick={handleExportAll}
                    className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
                  >
                    <Download className="h-4 w-4" />
                    {t.settings.exportImport.exportAll}
                  </Button>
                </div>

                {/* Import mode selector */}
                <div className="mb-3">
                  <div className="mb-2 block text-xs font-medium text-gray-400">
                    {t.settings.exportImport.importMode}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setImportMode('merge')}
                      variant={importMode === 'merge' ? 'primary' : 'secondary'}
                      size="sm"
                      className={`flex-1 px-3 py-2 text-xs font-medium ${
                        importMode === 'merge'
                          ? ''
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-none'
                      }`}
                    >
                      {t.settings.exportImport.merge}
                    </Button>
                    <Button
                      onClick={() => setImportMode('replace')}
                      variant={importMode === 'replace' ? 'primary' : 'secondary'}
                      size="sm"
                      className={`flex-1 px-3 py-2 text-xs font-medium ${
                        importMode === 'replace'
                          ? ''
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-none'
                      }`}
                    >
                      {t.settings.exportImport.replace}
                    </Button>
                  </div>
                </div>

                {/* Import button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  onClick={handleImportClick}
                  variant="secondary"
                  className="flex w-full items-center justify-center gap-2 border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  <Upload className="h-4 w-4" />
                  {t.settings.exportImport.import}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
