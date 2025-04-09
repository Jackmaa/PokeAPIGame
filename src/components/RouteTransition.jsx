import { motion } from 'framer-motion';

function RouteTransition({ typeColor = '#FFCB05', onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1.05 }}
      exit={{ opacity: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={onComplete}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: typeColor,
        zIndex: 9999,
        mixBlendMode: 'hard-light',
        pointerEvents: 'none',
      }}
    ></motion.div>
  );
}

export default RouteTransition;
