import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to Top"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000,
            filter: 'drop-shadow(0 0 8px #e60012aa)',
          }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.svg
            width="48"
            height="48"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          >
            {/* Base blanche avec bord */}
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="#fff"
              stroke="#333"
              strokeWidth="4"
            />

            {/* Demi-cercle rouge (haut) */}
            <path d="M2 50a48 48 0 0 1 96 0" fill="#e60012" />

            {/* Ligne centrale */}
            <path d="M2 50h96" stroke="#333" strokeWidth="6" />

            {/* Cœur du bouton (gris foncé cerclé) */}
            <circle
              cx="50"
              cy="50"
              r="12"
              fill="#fff"
              stroke="#333"
              strokeWidth="4"
            />

            {/* Mini cercle intérieur blanc */}
            <circle cx="50" cy="50" r="5" fill="#fff" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTopButton;
