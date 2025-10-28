import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Edit2, Trash2, FolderOpen } from 'lucide-react';
import { useSessionsStore } from '../stores/sessionsStore';
import { useI18nStore } from '../stores/i18nStore';
import { ConfirmDialog } from './ConfirmDialog';
import { Toast } from './Toast';
import { scale } from '../utils/animations';

interface SessionManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SessionManagerModal({ isOpen, onClose }: SessionManagerModalProps) {
  const { t } = useI18nStore();
  const { sessions, activeSessionId, createSession, renameSession, deleteSession, setActiveSession } = useSessionsStore();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [newSessionName, setNewSessionName] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);
  const [showRenameSuccess, setShowRenameSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showCannotDeleteError, setShowCannotDeleteError] = useState(false);

  const handleCreate = () => {
    if (newSessionName.trim()) {
      createSession(newSessionName.trim());
      setNewSessionName('');
      setShowCreateSuccess(true);
    }
  };

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleSaveEdit = () => {
    if (editingId && editingName.trim()) {
      renameSession(editingId, editingName.trim());
      setEditingId(null);
      setEditingName('');
      setShowRenameSuccess(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      if (sessions.length === 1) {
        setShowCannotDeleteError(true);
        setDeletingId(null);
        return;
      }
      deleteSession(deletingId);
      setDeletingId(null);
      setShowDeleteSuccess(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const getSolveCountText = (count: number) => {
    return count === 1 ? t.sessions.solveCountSingular : t.sessions.solveCount;
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              variants={scale}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <FolderOpen className="text-primary" size={24} />
                  <h2 className="text-xl font-bold text-white">{t.sessions.manage}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label={t.actions.close}
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Create New Session */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.sessions.create}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSessionName}
                      onChange={(e) => setNewSessionName(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, handleCreate)}
                      placeholder={t.sessions.namePlaceholder}
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={handleCreate}
                      disabled={!newSessionName.trim()}
                      className="px-4 py-2 bg-primary hover:bg-primary-hover disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Plus size={18} />
                      <span className="hidden sm:inline">{t.actions.create}</span>
                    </button>
                  </div>
                </div>

                {/* Sessions List */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.sessions.title}
                  </label>
                  <div className="space-y-2">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className={`p-4 bg-gray-700 rounded-lg border-2 transition-colors ${
                          session.id === activeSessionId
                            ? 'border-primary'
                            : 'border-transparent'
                        }`}
                      >
                        {editingId === session.id ? (
                          // Edit Mode
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e, handleSaveEdit)}
                              className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-primary"
                              autoFocus
                            />
                            <button
                              onClick={handleSaveEdit}
                              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            >
                              {t.actions.save}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                            >
                              {t.actions.cancel}
                            </button>
                          </div>
                        ) : (
                          // View Mode
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => {
                                setActiveSession(session.id);
                              }}
                              className="flex-1 text-left"
                            >
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-white">{session.name}</p>
                                {session.id === activeSessionId && (
                                  <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded">
                                    Ativa
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-400 mt-1">
                                {session.solves.length} {getSolveCountText(session.solves.length)}
                              </p>
                            </button>
                            <div className="flex gap-1 ml-2">
                              <button
                                onClick={() => handleStartEdit(session.id, session.name)}
                                className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                                title={t.sessions.rename}
                              >
                                <Edit2 size={16} className="text-gray-400" />
                              </button>
                              <button
                                onClick={() => setDeletingId(session.id)}
                                className="p-2 hover:bg-red-600/20 rounded-lg transition-colors"
                                title={t.sessions.delete}
                              >
                                <Trash2 size={16} className="text-red-400" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-700 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  {t.actions.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deletingId !== null}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title={t.sessions.deleteConfirm.title}
        message={t.sessions.deleteConfirm.message}
        confirmText={t.actions.delete}
        cancelText={t.actions.cancel}
        variant="danger"
      />

      {/* Success Toasts */}
      {showCreateSuccess && (
        <Toast
          message={t.sessions.createSuccess}
          type="success"
          onClose={() => setShowCreateSuccess(false)}
        />
      )}
      {showRenameSuccess && (
        <Toast
          message={t.sessions.renameSuccess}
          type="success"
          onClose={() => setShowRenameSuccess(false)}
        />
      )}
      {showDeleteSuccess && (
        <Toast
          message={t.sessions.deleteSuccess}
          type="success"
          onClose={() => setShowDeleteSuccess(false)}
        />
      )}
      {showCannotDeleteError && (
        <Toast
          message={t.sessions.cannotDeleteLast}
          type="error"
          onClose={() => setShowCannotDeleteError(false)}
        />
      )}
    </>
  );
}
