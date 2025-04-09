import { useRef } from 'react';
import { motion } from 'framer-motion';

function RouteTransition({
  typeColor = 'transparent',
  onComplete,
  mode = 'out',
}) {
  const isIn = mode === 'in';
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
          clipPath: isIn
            ? 'circle(200vmax at 50% 50%)'
            : 'circle(0% at 50% 50%)',
        }}
        animate={{
          clipPath: isIn
            ? 'circle(0% at 50% 50%)'
            : 'circle(200vmax at 50% 50%)',
        }}
        transition={{ duration: 0.5, ease: 'ease' }}
        onAnimationComplete={handleAnimationComplete}
        className="circle-transition"
        style={{ backgroundColor: typeColor }}
      />
      <div className="fade-bars" />
    </div>
  );
}

export default RouteTransition;
