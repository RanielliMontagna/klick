import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { usePWAUpdatePrompt } from './usePWAUpdatePrompt';

export function PWAUpdatePrompt() {
  const { showPrompt, needRefresh, close, handleUpdate } = usePWAUpdatePrompt();

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50"
        >
          <div className="bg-card border-2 border-primary rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Download className="w-5 h-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1">
                  {needRefresh ? 'Nova atualização disponível!' : 'App pronto para uso offline!'}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {needRefresh
                    ? 'Uma nova versão do Klick está disponível. Atualize para obter as últimas melhorias.'
                    : 'O Klick agora pode funcionar offline!'}
                </p>

                <div className="flex gap-2">
                  {needRefresh && (
                    <button
                      onClick={handleUpdate}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
                    >
                      Atualizar agora
                    </button>
                  )}
                  <button
                    onClick={close}
                    className="px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors text-sm"
                  >
                    {needRefresh ? 'Depois' : 'Entendi'}
                  </button>
                </div>
              </div>

              <button
                onClick={close}
                className="shrink-0 w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
