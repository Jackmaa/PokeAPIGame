import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EvolutionChain({ species }) {
  const [evolution, setEvolution] = useState(null);

  useEffect(() => {
    const fetchEvolution = async () => {
      try {
        const evoUrl = species?.evolution_chain?.url;
        if (!evoUrl) return;

        const res = await axios.get(evoUrl);
        setEvolution(res.data.chain);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('❌ Failed to load evolution chain:', err);
      }
    };

    fetchEvolution();
  }, [species]);

  const renderChain = (chain, depth = 0) => {
    if (!chain) return null;
    return (
      <div style={{ marginLeft: depth * 20 }}>
        ➤ {chain.species.name}
        {chain.evolves_to.map(evo => renderChain(evo, depth + 1))}
      </div>
    );
  };

  if (!evolution) return null;

  return (
    <div>
      <h3>🧬 Evolution Chain:</h3>
      {renderChain(evolution)}
    </div>
  );
}

export default EvolutionChain;
