import { Download, Upload, Sun, Moon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui';
import { useSettingsStore } from '@/stores/settingsStore';
import { useSessionsStore } from '@/stores/sessionsStore';
import { useI18nStore } from '@/stores/i18nStore';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

type ExportImportMessage = {
  type: 'success' | 'error';
  text: string;
} | null;

export function SettingsContent() {
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
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Message feedback */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inspection Duration */}
      <div className="bg-surface rounded-xl p-6 border border-border space-y-4">
        <div>
          <div className="block text-sm font-semibold text-text-primary mb-1">
            {t.settings.inspectionDuration.label}
          </div>
          <p className="text-xs text-text-secondary">{t.settings.inspectionDuration.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={settings.inspectionDuration}
            onChange={(e) => handleInspectionDurationChange(Number(e.target.value))}
            className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <span className="text-lg font-bold text-primary min-w-12 text-right">
            {settings.inspectionDuration}s
          </span>
        </div>
      </div>

      {/* Sounds */}
      <div className="bg-surface rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <div className="block text-sm font-semibold text-text-primary mb-1">
              {t.settings.soundsEnabled.label}
            </div>
            <p className="text-xs text-text-secondary">{t.settings.soundsEnabled.description}</p>
          </div>
          <Button
            onClick={handleSoundsToggle}
            variant="ghost"
            size="icon"
            className={`relative w-12 h-6 rounded-full transition-colors p-0 justify-start ${
              settings.soundsEnabled ? 'bg-primary' : 'bg-border'
            }`}
            aria-pressed={settings.soundsEnabled}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.soundsEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Auto Inspection Penalty */}
      <div className="bg-surface rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <div className="block text-sm font-semibold text-text-primary mb-1">
              {t.settings.autoInspectionPenalty.label}
            </div>
            <p className="text-xs text-text-secondary">
              {t.settings.autoInspectionPenalty.description}
            </p>
          </div>
          <Button
            onClick={handleAutoInspectionPenaltyToggle}
            variant="ghost"
            size="icon"
            className={`relative w-12 h-6 rounded-full transition-colors p-0 justify-start ${
              settings.autoInspectionPenalty ? 'bg-primary' : 'bg-border'
            }`}
            aria-pressed={settings.autoInspectionPenalty}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                settings.autoInspectionPenalty ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Theme */}
      <div className="bg-surface rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <div className="block text-sm font-semibold text-text-primary mb-1">
              {t.settings.theme.label}
            </div>
            <p className="text-xs text-text-secondary">{t.settings.theme.description}</p>
          </div>
          <Button
            onClick={toggleTheme}
            variant="secondary"
            className={`flex items-center gap-2 px-4 py-2 font-medium border transition-colors ${
              theme === 'light'
                ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30'
                : 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30'
            }`}
          >
            {theme === 'light' ? (
              <>
                <Sun className="w-4 h-4" />
                <span className="text-sm">{t.settings.theme.light}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span className="text-sm">{t.settings.theme.dark}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Export/Import */}
      <div className="bg-surface rounded-xl p-6 border border-border space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-1">
            {t.settings.exportImport.title}
          </h3>
          <p className="text-xs text-text-secondary">Exporte ou importe suas sessões</p>
        </div>

        {/* Export buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={handleExportCurrent}
            variant="secondary"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">{t.settings.exportImport.exportCurrent}</span>
          </Button>
          <Button
            onClick={handleExportAll}
            variant="secondary"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">{t.settings.exportImport.exportAll}</span>
          </Button>
        </div>

        {/* Import section */}
        <div className="space-y-3 pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="importMode"
                value="merge"
                checked={importMode === 'merge'}
                onChange={(e) => setImportMode(e.target.value as 'merge' | 'replace')}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-text-secondary">{t.settings.exportImport.merge}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="importMode"
                value="replace"
                checked={importMode === 'replace'}
                onChange={(e) => setImportMode(e.target.value as 'merge' | 'replace')}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-text-secondary">{t.settings.exportImport.replace}</span>
            </label>
          </div>
          <Button
            onClick={handleImportClick}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-border hover:bg-border/80 text-text-primary border-none"
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">{t.settings.exportImport.import}</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
