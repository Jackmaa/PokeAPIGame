import { useEffect, useState } from 'react';
import { fetchPokemon, fetchSpecies } from '../api/pokeapi';

const getSafeBaseName = name => {
  if (name.includes('-mega')) return name.split('-mega')[0];
  if (name.includes('-gmax')) return name.split('-gmax')[0];
  if (name.includes('-totem')) return name.split('-totem')[0];
  return name;
};

export function usePokemonDetails(id) {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [forms, setForms] = useState([]); // ✅ manquant ici
  const [error, setError] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsFallback(false);
      setForms([]); // reset

      const safeName = getSafeBaseName(id);

      try {
        let pokemonData;
        try {
          const res1 = await fetchPokemon(id);
          pokemonData = res1.data;
        } catch {
          const fallback = await fetchPokemon(safeName);
          pokemonData = fallback.data;
          setIsFallback(true);
        }

        setPokemon(pokemonData);

        const speciesRes = await fetchSpecies(safeName);
        setSpecies(speciesRes.data);

        // ✅ Récupération des formes disponibles
        const formList = speciesRes.data.varieties.map(v => v.pokemon.name);
        setForms(formList);
      } catch (err) {
        console.error('Erreur chargement détail Pokémon:', err);
        setError(true);
      }
    };

    fetchData();
  }, [id]);

  return { pokemon, species, error, isFallback, forms };
}
