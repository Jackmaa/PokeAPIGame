import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSprite from './AnimatedSprites';
import EvolutionChain from './EvolutionChain';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import typeColors from '../utils/typeColors';
import typeEmojis from '../utils/typeEmojis';
import { useState } from 'react';
import Button from './ui/Button';
import StatBar from './ui/StatBar';
import FormSelector from './FormSelector';

function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showShiny, setShowShiny] = useState(false);

  const { pokemon, species, error, isFallback, forms } = usePokemonDetails(id);
  if (error) {
    return (
      <div className="pokemon-details">
        <h2>❌ Pokémon not found</h2>
        <p>Either this form doesn’t exist or the PokéAPI has no data for it.</p>
        <button onClick={() => navigate('/')}>⬅ Back to Pokédex</button>
      </div>
    );
  }

  if (!pokemon || !species) return <div className="pokeball-spinner"></div>;

  const primaryType = pokemon.types[0]?.type.name;
  const color = typeColors[primaryType] || '#888';
  const description =
    species.flavor_text_entries
      .find(e => e.language.name === 'en')
      ?.flavor_text.replace(/\f/g, ' ') ||
    'No Pokédex entry available for this form.';

  const safeCryName = pokemon.name.includes('-')
    ? pokemon.name.split('-')[0]
    : pokemon.name;

  return (
    <motion.div
      className="pokemon-details"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        border: `2px solid ${color}`,
        borderRadius: '1rem',
        background: `${color}10`,
      }}
    >
      <Button onClick={() => navigate('/')} color={color} variant="filled">
        ⬅ Back to Pokédex
      </Button>

      {isFallback && (
        <p style={{ fontStyle: 'italic', color: '#e67e22' }}>
          No detailed data for <strong>{id}</strong>. Showing base form{' '}
          <strong>{pokemon.name}</strong>.
        </p>
      )}

      <h1 style={{ color }}>
        {typeEmojis[primaryType]} {pokemon.name.toUpperCase()}
      </h1>

      <div style={{ margin: '1rem 0' }}>
        <Button
          onClick={() => setShowShiny(!showShiny)}
          color={color}
          size="sm"
        >
          {showShiny ? '✨ Show Normal' : '⭐ Show Shiny'}
        </Button>
      </div>

      <AnimatedSprite
        sprites={pokemon.sprites}
        alt={pokemon.name}
        size={128}
        float
        shiny={showShiny}
      />

      <p>
        <strong>Pokédex Entry:</strong> <br />
        <em>{description}</em>
      </p>
      <FormSelector
        forms={forms}
        activeForm={id}
        onSelect={form => navigate(`/pokemon/${form}`)}
        color={color}
      />

      <h3>Types:</h3>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {pokemon.types.map(t => (
          <span key={t.type.name} style={{ color: typeColors[t.type.name] }}>
            {typeEmojis[t.type.name]} {t.type.name.toUpperCase()}
          </span>
        ))}
      </div>
      {pokemon.stats?.length > 0 && (
        <>
          <h3>Stats:</h3>
          {pokemon.stats.map(stat => (
            <StatBar
              key={stat.stat.name}
              name={stat.stat.name}
              value={stat.base_stat}
              color={color}
            />
          ))}
        </>
      )}

      <EvolutionChain species={species} />

      <audio controls style={{ marginTop: '1rem' }}>
        <source
          src={`https://play.pokemonshowdown.com/audio/cries/${safeCryName}.mp3`}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </motion.div>
  );
}

export default PokemonDetails;
