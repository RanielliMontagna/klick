import { useState } from 'react';
import { FolderOpen, Settings } from 'lucide-react';
import { useSessionsStore } from '@/stores/sessionsStore';
import { useI18nStore } from '@/stores/i18nStore';
import { HeaderDropdownButton, HeaderDropdownMenu } from '@/components';

interface SessionSwitcherProps {
  onManageClick: () => void;
}

export function SessionSwitcher({ onManageClick }: SessionSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18nStore();
  const { sessions, activeSessionId, setActiveSession, getActiveSession } = useSessionsStore();

  const activeSession = getActiveSession();

  const handleSessionSelect = (sessionId: string) => {
    setActiveSession(sessionId);
    setIsOpen(false);
  };

  const getSolveCountText = (count: number) => {
    return count === 1 ? t.sessions.solveCountSingular : t.sessions.solveCount;
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <HeaderDropdownButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        icon={<FolderOpen size={16} className="sm:w-[18px] sm:h-[18px]" />}
        label={activeSession?.name || t.sessions.current}
        ariaLabel={t.sessions.title}
      />

      {/* Dropdown Menu */}
      <HeaderDropdownMenu isOpen={isOpen} onClose={() => setIsOpen(false)} align="right">
        {/* Sessions List */}
        <div className="max-h-64 overflow-y-auto">
          {sessions.map((session) => (
            <button
              key={session.id}
              type="button"
              onClick={() => handleSessionSelect(session.id)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700/50 last:border-b-0 ${
                session.id === activeSessionId ? 'bg-gray-700/50' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-white truncate">
                    {session.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {session.solves.length} {getSolveCountText(session.solves.length)}
                  </p>
                </div>
                {session.id === activeSessionId && (
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Manage Button */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            onManageClick();
          }}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 bg-gray-700/50 hover:bg-gray-700 transition-colors border-t border-gray-600"
        >
          <Settings size={14} className="text-primary shrink-0 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium text-white">{t.sessions.manage}</span>
        </button>
      </HeaderDropdownMenu>
    </div>
  );
}
