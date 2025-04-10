import { useState, useEffect } from 'react';
import axios from 'axios';
import typeColors from '../utils/typeColors';
import typeEmojis from '../utils/typeEmojis';

function TypeFilter({ onSelectType, selectedType }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/type');
        const filteredTypes = res.data.results.filter(
          type => !['shadow', 'stellar', 'unknown'].includes(type.name)
        );
        setTypes(filteredTypes);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching types:', error);
      }
    };
    fetchTypes();
  }, []);

  const renderButton = (typeName, isSelected) => {
    const color = typeColors[typeName] || '#888';
    const bg = isSelected ? color : `${color}22`;

    const text = typeName === 'all' ? '#FFF' : isSelected ? '#fff' : color;

    return {
      backgroundColor: bg,
      color: text,
      outline: `2px solid ${color}`,
      outlineRadius: '1rem',
      padding: '0.4rem 0.2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
    };
  };

  return (
    <div
      className="type-filter"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(100px, 1fr))',
        gap: '0.7rem',
      }}
    >
      <button
        onClick={() => onSelectType(null)}
        style={renderButton('all', selectedType === null)}
        title="Show all Pokémon"
      >
        {typeEmojis['all']} ALL
      </button>
      {types.map(type => (
        <button
          key={type.name}
          onClick={() => onSelectType(type.name)}
          style={renderButton(type.name, selectedType === type.name)}
          title={`Show ${type.name}-type Pokémon`}
        >
          {typeEmojis[type.name] || '🔹'} {type.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default TypeFilter;
