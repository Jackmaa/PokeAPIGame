import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import AnimatedSprites from './AnimatedSprites';

function EvolutionChain({ species }) {
  const [chainSprites, setChainSprites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvolution = async () => {
      try {
        const evoUrl = species?.evolution_chain?.url;
        if (!evoUrl) return;

        const res = await axios.get(evoUrl);
        const flatChain = [];

        const walkChain = async node => {
          const speciesName = node.species.name;
          const pokeRes = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${speciesName}`
          );
          flatChain.push({
            name: speciesName,
            id: pokeRes.data.id,
            sprites: pokeRes.data.sprites,
          });

          if (node.evolves_to.length > 0) {
            await walkChain(node.evolves_to[0]); // On prend le premier chemin seulement
          }
        };

        await walkChain(res.data.chain);
        setChainSprites(flatChain);
      } catch (err) {
        console.error('❌ Failed to load evolution chain:', err);
      }
    };

    fetchEvolution();
  }, [species]);

  if (chainSprites.length === 0) return null;

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
