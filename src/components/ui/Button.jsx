import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function Button({
  children,
  onClick,
  color = '#333',
  fullWidth = false,
  variant = 'filled',
  size = 'md',
  ...props
}) {
  const sizes = {
    sm: '0.3rem 0.6rem',
    md: '0.5rem 1rem',
    lg: '0.8rem 1.4rem',
  };

  const styles = {
    filled: {
      backgroundColor: color,
      color: '#fff',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color,
      border: `2px solid ${color}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color,
      border: 'none',
    },
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        padding: sizes[size],
        borderRadius: '0.5rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s ease',
        ...styles[variant],
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf(['filled', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Button;
