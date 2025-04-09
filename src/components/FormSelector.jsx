import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function FormSelector({ forms, activeForm, onSelect, color = '#333' }) {
  if (!forms || forms.length <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ marginBottom: '1rem' }}
    >
      <h4 style={{ marginBottom: '0.5rem' }}>Available Forms:</h4>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {forms.map(formName => (
          <motion.button
            key={formName}
            onClick={() => onSelect(formName)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.3rem 0.8rem',
              backgroundColor: formName === activeForm ? color : '#eee',
              color: formName === activeForm ? '#fff' : '#333',
              border:
                formName === activeForm
                  ? `1px solid ${color}`
                  : '1px solid #ccc',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {formName.replaceAll('-', ' ').toUpperCase()}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

FormSelector.propTypes = {
  forms: PropTypes.array.isRequired,
  activeForm: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  color: PropTypes.string,
};

export default FormSelector;
