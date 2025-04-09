import PropTypes from 'prop-types';

function FavButton({ isFav, onToggle }) {
  return (
    <button
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className="fav-button"
      aria-label="Favorite toggle"
      style={{
        background: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: isFav ? '#f1c40f' : '#999',
      }}
    >
      {isFav ? '⭐' : '☆'}
    </button>
  );
}

FavButton.propTypes = {
  isFav: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default FavButton;
