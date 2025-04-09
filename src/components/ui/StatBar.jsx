import PropTypes from 'prop-types';

function StatBar({ name, value, color = '#888', max = 150 }) {
  const percent = Math.min(value, max);

  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <strong>{name.toUpperCase()}:</strong>
      <div
        style={{
          background: '#ddd',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          height: '1rem',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <div
          style={{
            width: `${(percent / max) * 100}%`,
            backgroundColor: color,
            height: '100%',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}

StatBar.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
  max: PropTypes.number,
};

export default StatBar;
