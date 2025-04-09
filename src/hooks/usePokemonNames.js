import { useEffect, useState } from 'react';
import axios from 'axios';

function usePokemonNames() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=1000'
        );
        const results = res.data.results.map(p => p.name);
        setNames(results);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch Pokémon names:', err);
      }
    };

    fetchNames();
  }, []);

  return names;
}

export default usePokemonNames;
