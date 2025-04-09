import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

function AnimatedSprite({
  sprites,
  alt,
  size = 96,
  float = false,
  shiny = false,
}) {
  const animated =
    sprites?.versions?.['generation-v']?.['black-white']?.animated;

  const spriteSrc = shiny
    ? animated?.front_shiny || sprites?.front_shiny
    : animated?.front_default || sprites?.front_default;

  if (!spriteSrc) return null;

  const image = (
    <AnimatePresence mode="wait">
      <motion.img
        key={shiny ? 'shiny' : 'normal'} // force le changement d'image
        src={spriteSrc}
        alt={alt}
        className="animated-sprite"
        style={{ width: size, height: size }}
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        exit={{ opacity: 0, rotateY: -90 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
    </AnimatePresence>
  );

  return float ? (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -4, 0, 4, 0] }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut',
      }}
    >
      {image}
    </motion.div>
  ) : (
    image
  );
}

AnimatedSprite.propTypes = {
  sprites: PropTypes.object.isRequired,
  alt: PropTypes.string,
  size: PropTypes.number,
  float: PropTypes.bool,
  shiny: PropTypes.bool,
};

export default AnimatedSprite;
