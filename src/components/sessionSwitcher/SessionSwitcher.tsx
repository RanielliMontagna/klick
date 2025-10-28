import { useState } from 'react';
import { ChevronDown, FolderOpen, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionsStore } from '../../stores/sessionsStore';
import { useI18nStore } from '../../stores/i18nStore';
import { slideDown } from '../../utils/animations';

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
      >
        <FolderOpen size={18} className="text-primary" />
        <span className="text-sm font-medium text-white max-w-[120px] sm:max-w-[200px] truncate">
          {activeSession?.name || t.sessions.current}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-gray-400" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              variants={slideDown}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute top-full left-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden"
            >
              {/* Sessions List */}
              <div className="max-h-64 overflow-y-auto">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => handleSessionSelect(session.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700/50 last:border-b-0 ${
                      session.id === activeSessionId ? 'bg-gray-700/50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {session.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {session.solves.length} {getSolveCountText(session.solves.length)}
                        </p>
                      </div>
                      {session.id === activeSessionId && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 ml-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Manage Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onManageClick();
                }}
                className="w-full px-4 py-3 flex items-center gap-2 bg-gray-700/50 hover:bg-gray-700 transition-colors border-t border-gray-600"
              >
                <Settings size={16} className="text-primary" />
                <span className="text-sm font-medium text-white">
                  {t.sessions.manage}
                </span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
