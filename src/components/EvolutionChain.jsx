import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSprites from './AnimatedSprites';

function EvolutionChain({ species }) {
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [chainSprites, setChainSprites] = useState([]);
  const navigate = useNavigate();

  // Étape 1: Fetch de la chaîne d'évolution
  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        if (!species?.evolution_chain?.url) return;
        const res = await axios.get(species.evolution_chain.url);
        setEvolutionChain(res.data.chain);
      } catch (err) {
        console.error('Erreur chargement chaîne évolution :', err);
      }
    };
    fetchEvolutionChain();
  }, [species]);

  // Étape 2: Parser la chaîne d’évolution en liste de noms
  const extractNames = chain => {
    const names = [];
    let current = chain;
    while (current) {
      names.push(current.species.name);
      current = current.evolves_to?.[0];
    }
    return names;
  };

  // Étape 3: Récupération des sprites
  useEffect(() => {
    const fetchSprites = async () => {
      if (!evolutionChain) return;
      const names = extractNames(evolutionChain);

      try {
        const data = await Promise.all(
          names.map(async name => {
            const res = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${name}`
            );
            return {
              id: res.data.id,
              name: res.data.name,
              sprites: res.data.sprites,
            };
          })
        );
        setChainSprites(data);
      } catch (err) {
        console.error('Erreur chargement sprites évolution :', err);
      }
    };
    fetchSprites();
  }, [evolutionChain]);

  // 🧪 Sécurité visuelle
  if (!species?.evolution_chain?.url) {
    return (
      <div className="evolution-chain">
        <h3>🧬 Evolution Chain</h3>
        <p style={{ fontStyle: 'italic' }}>
          This form has no evolution chain available.
        </p>
      </div>
    );
  }

  if (chainSprites.length === 0) {
    return <div className="pokeball-spinner"></div>;
  }

  // ✅ Rendu final
  return (
    <div className="evolution-chain">
      <h3 style={{ marginBottom: '1rem' }}>🧬 Evolution Chain</h3>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {chainSprites.map((poke, i) => (
          <motion.div
            key={poke.id}
            onClick={() => navigate(`/pokemon/${poke.id}`)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              textAlign: 'center',
              cursor: 'pointer',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <AnimatedSprites sprites={poke.sprites} alt={poke.name} size={80} />
            <div style={{ marginTop: '0.3rem', fontWeight: 'bold' }}>
              {poke.name}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default EvolutionChain;
