import React, { useRef } from 'react';
import { motion } from 'framer-motion';

function RouteTransition({ typeColor = 'transparent', onComplete }) {
  const containerRef = useRef(null);
  const handleAnimationComplete = () => {
    if (containerRef.current) {
      containerRef.current.classList.add('fade-out');
      onComplete?.();
    }
  };

  return (
    <div className="battle-intro" ref={containerRef}>
      <motion.div
        initial={{
          clipPath: 'circle(200vmax at 50% 50%)',
        }}
        animate={{
          clipPath: 'circle(0% at 50% 50%)',
        }}
        transition={{ duration: 0.5, ease: 'ease' }}
        onAnimationComplete={handleAnimationComplete}
        className="circle-transition"
        style={{ backgroundColor: typeColor }}
      />

      {/* Pokéball au centre */}
      <motion.div
        className="poke-circle"
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ scale: 3, rotate: 360, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `linear-gradient(to bottom, white 50%, red 50%)`,
          border: '4px solid black',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: 'black',
            transform: 'translateY(-50%)',
          }}
        />
      </motion.div>

      <div className="fade-bars" />
    </div>
  );
}
export default RouteTransition;
