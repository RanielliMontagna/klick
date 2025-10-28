import type { Variants } from 'framer-motion';

/**
 * Variantes de animação para fade in
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

/**
 * Variantes de animação para slide up
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2 }
  }
};

/**
 * Variantes de animação para slide down
 */
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

/**
 * Variantes de animação para scale
 */
export const scale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

/**
 * Variantes de animação para slide in from right
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.2 }
  }
};

/**
 * Variantes de animação para stagger children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

/**
 * Variantes de animação para pulse
 */
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Variantes de animação para shake (erro)
 */
export const shake: Variants = {
  initial: { x: 0 },
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  }
};
