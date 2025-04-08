import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedSprite from './AnimatedSprites';
import useFavorites from '../hooks/useFavorites';
import typeColors from '../utils/typeColors';
import typeEmojis from '../utils/typeEmojis';

function PokemonCard({ data, onSelectType }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = useMemo(() => isFavorite(data.id), [data.id, isFavorite]);
  const navigate = useNavigate();

  if (!data) return null;

  const primaryType = data.types[0]?.type.name;
  const bgColor = typeColors[primaryType] || '#777';

  return (
    <motion.div
      className="pokemon-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        background: `${bgColor}20`,
        border: `2px solid ${bgColor}`,
        borderRadius: '1rem',
      }}
      onClick={() => navigate(`/pokemon/${data.id}`)}
    >
      <button
        onClick={() => toggleFavorite(data)}
        className="fav-button"
        aria-label="Favorite toggle"
      >
        {isFav ? '⭐' : '☆'}
      </button>
      <h2 style={{ color: bgColor, textShadow: '0 0 1px rgb(255, 255, 255)' }}>
        {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
      </h2>
      <AnimatedSprite sprites={data.sprites} alt={data.name} size={96} float />
      <div
        className="pokemon-types"
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {data.types.map(t => (
          <button
            key={t.type.name}
            onClick={() => onSelectType(t.type.name)}
            title={`Filter by ${t.type.name} type`}
            style={{
              backgroundColor: typeColors[t.type.name] + '22',
              color: typeColors[t.type.name],
              border: `1px solid ${typeColors[t.type.name]}`,
              borderRadius: '0.5rem',
              padding: '0.2rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            {typeEmojis[t.type.name] || '🔹'} {t.type.name.toUpperCase()}
          </button>
        ))}
      </div>
      <p>
        <strong>Height: </strong>
        {data.height}
      </p>
      <p>
        <strong>Weight: </strong>
        {data.weight}
      </p>
      <div>
        <strong>Abilities:</strong>
        <ul>
          {data.abilities.map((a, i) => (
            <li key={i}>{a.ability.name}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default PokemonCard;
