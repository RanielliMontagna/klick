import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, History, TrendingUp, BookOpen, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

export function MobileNav() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/', icon: Home, label: t.navigation.home },
    { to: '/history', icon: History, label: t.navigation.history },
    { to: '/stats', icon: TrendingUp, label: t.navigation.stats },
    { to: '/tutorial', icon: BookOpen, label: t.navigation.tutorial },
    { to: '/settings', icon: Settings, label: t.navigation.settings },
  ];

  const handleClose = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
        aria-label="Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
            />

            {/* Menu drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-background border-l border-border z-101 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-surface/50">
                  <h2 className="text-lg font-bold text-text-primary">{t.app.title}</h2>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
                    aria-label="Fechar menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation items */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                  {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={handleClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-white shadow-md'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface hover:shadow-sm'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{label}</span>
                    </NavLink>
                  ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-border bg-surface/30">
                  <p className="text-xs text-text-secondary text-center">{t.app.tagline}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
