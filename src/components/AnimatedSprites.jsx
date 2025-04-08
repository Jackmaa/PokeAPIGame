import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function AnimatedSprite({ sprites, alt = 'Pokemon', size = 96, float = true }) {
  const animated =
    sprites?.versions?.['generation-v']?.['black-white']?.animated
      ?.front_default;
  const fallback = sprites?.front_default;

  const spriteSrc = animated || fallback;

  if (!spriteSrc) return null;

  const sprite = (
    <img
      src={spriteSrc}
      alt={alt}
      className="animated-sprite"
      style={{ width: size, height: size }}
    />
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
      {sprite}
    </motion.div>
  ) : (
    sprite
  );
}

AnimatedSprite.propTypes = {
  sprites: PropTypes.object.isRequired,
  alt: PropTypes.string,
  size: PropTypes.number,
  float: PropTypes.bool,
};

export default AnimatedSprite;
