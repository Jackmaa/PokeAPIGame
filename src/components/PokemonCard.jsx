import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedSprite from './AnimatedSprites';
import useFavorites from '../hooks/useFavorites';
import typeColors from '../utils/typeColors';
import typeEmojis from '../utils/typeEmojis';
import { useRouteTransition } from './TransitionManager';
import FavButton from './ui/FavButton';
import { useComparison } from '../context/ComparisonContext';

function PokemonCard({ data, onSelectType, isSelected, onToggleCompare }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = useMemo(() => isFavorite(data.id), [data.id, isFavorite]);
  const { triggerTransition } = useRouteTransition();
  const bgColor = typeColors[data.types[0]?.type.name] || '#777';
  const handleClick = () => {
    triggerTransition(bgColor, () => {
      navigate(`/pokemon/${data.name}`);
    });
  };
  const { comparisonList, toggleCompare } = useComparison();

  return (
    <motion.div
      className="pokemon-card"
      onClick={handleClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        background: `${bgColor}20`,
        border: `2px solid ${bgColor}`,
        borderRadius: '1rem',
        padding: '1rem',
        minWidth: '220px',
        maxHeight: '350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: `0 4px 10px ${bgColor}55`,
        transition: 'transform 0.2s ease',
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: `0 0 16px ${bgColor}, 0 0 24px ${bgColor}aa`,
      }}
    >
      <FavButton isFav={isFav} onToggle={() => toggleFavorite(data)} />
      <input
        type="checkbox"
        checked={comparisonList.some(p => p.name === data.name)}
        onClick={e => {
          e.stopPropagation();
          toggleCompare(data);
        }}
      />
      <h2
        style={{
          color: bgColor,
          fontSize: '1.5rem',
          marginBottom: '0.5rem',
          textAlign: 'center',
          textShadow: '0 0 1px #fff',
        }}
      >
        {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
      </h2>

      <AnimatedSprite
        sprites={data.sprites}
        alt={data.name}
        size={96}
        float
        style={{ margin: '0.5rem 0' }}
      />

      {/* 🔘 TYPES */}
      <div
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
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onSelectType(t.type.name);
            }}
            title={`Filter by ${t.type.name} type`}
            style={{
              backgroundColor: typeColors[t.type.name] + '22',
              color: typeColors[t.type.name],
              border: `1px solid ${typeColors[t.type.name]}`,
              borderRadius: '0.5rem',
              padding: '0.2rem 0.6rem',
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

      {/* 📏 Infos */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          marginTop: '0.5rem',
        }}
      >
        <p>
          <strong>Height:</strong> {data.height}
        </p>
        <p>
          <strong>Weight:</strong> {data.weight}
        </p>
      </div>

      <div style={{ width: '100%', marginTop: '0.5rem' }}>
        <strong>Abilities:</strong>
        <ul style={{ margin: 0, paddingLeft: '1rem' }}>
          {data.abilities.map((a, i) => (
            <li style={{ listStyleType: 'none' }} key={i}>
              {a.ability.name}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default PokemonCard;
