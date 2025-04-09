import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnimatedSprite from './AnimatedSprites';
import EvolutionChain from './EvolutionChain';
import { motion } from 'framer-motion';
import axios from 'axios';
import typeColors from '../utils/typeColors';
import typeEmojis from '../utils/typeEmojis';

function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [error, setError] = useState(false);

  // 🔐 Sécurise les noms spéciaux comme charizard-mega-x
  const getSafeBaseName = name => {
    if (name.includes('-mega')) return name.split('-mega')[0];
    if (name.includes('-gmax')) return name.split('-gmax')[0];
    if (name.includes('-totem')) return name.split('-totem')[0];
    return name;
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(false);

      const safeName = getSafeBaseName(id);

      try {
        let pokemonData;
        try {
          const res1 = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          pokemonData = res1.data;
        } catch {
          // fallback to safe name (e.g., "charizard")
          const resFallback = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${safeName}`
          );
          pokemonData = resFallback.data;
        }

        setPokemon(pokemonData);

        const res2 = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${safeName}`
        );
        setSpecies(res2.data);
      } catch (err) {
        console.error('Erreur chargement détail Pokémon:', err);
        setError(true);
      }
    };

    fetchData();
  }, [id]);
  if (error) {
    return (
      <div className="pokemon-details">
        <h2>❌ Pokémon not found</h2>
        <p>Either this form doesn’t exist or the PokéAPI has no data for it.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            cursor: 'pointer',
          }}
        >
          ⬅ Back to Pokédex
        </button>
      </div>
    );
  }

  if (!pokemon || !species) return <div className="pokeball-spinner"></div>;

  const description =
    species.flavor_text_entries
      ?.find(entry => entry.language.name === 'en')
      ?.flavor_text.replace(/\f/g, ' ') ||
    'No Pokédex entry available for this form.';

  const primaryType = pokemon.types[0]?.type.name;
  const color = typeColors[primaryType] || '#888';
  const safeCryName = getSafeBaseName(pokemon.name);
  const animatedSprites =
    pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated;

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
      <button
        onClick={() => navigate('/')}
        style={{
          backgroundColor: color,
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          cursor: 'pointer',
        }}
      >
        ⬅ Back to Pokédex
      </button>

      <h1 style={{ color }}>
        {typeEmojis[primaryType]} {pokemon.name.toUpperCase()}
      </h1>

      <AnimatedSprite
        sprites={pokemon.sprites}
        alt={pokemon.name}
        size={128}
        float
      />

      <p>
        <strong>Pokédex Entry:</strong> <br />
        <em>{description}</em>
      </p>

      {pokemon.stats?.length > 0 && (
        <>
          <h3>Stats:</h3>
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name} style={{ marginBottom: '0.5rem' }}>
              <strong>{stat.stat.name.toUpperCase()}:</strong>
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
                    width: `${Math.min(stat.base_stat, 150)}%`,
                    backgroundColor: color,
                    height: '100%',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </>
      )}

      {pokemon.types?.length > 0 && (
        <>
          <h3>Types:</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {pokemon.types.map(t => (
              <span
                key={t.type.name}
                style={{
                  backgroundColor: typeColors[t.type.name] + '22',
                  color: typeColors[t.type.name],
                  padding: '0.3rem 0.6rem',
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                {typeEmojis[t.type.name] || '🔹'} {t.type.name.toUpperCase()}
              </span>
            ))}
          </div>
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
