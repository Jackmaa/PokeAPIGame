import { useEffect, useState } from 'react';
import { fetchPokemon, fetchSpecies } from '../api/pokeapi';

const getSafeBaseName = name => {
  if (!name) return '';
  const normalized = name.toLowerCase();
  if (normalized.includes('-mega')) return normalized.split('-mega')[0];
  if (normalized.includes('-gmax')) return normalized.split('-gmax')[0];
  if (normalized.includes('-totem')) return normalized.split('-totem')[0];
  if (normalized.includes('-cap')) return 'pikachu'; // 🧢 casquettes
  if (normalized.startsWith('mimikyu-')) return 'mimikyu'; // busted
  if (normalized.startsWith('zygarde-')) return 'zygarde'; // formes
  return normalized.split('-')[0]; // fallback général
};

export function usePokemonDetails(id) {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [forms, setForms] = useState([]);
  const [error, setError] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsFallback(false);
      setForms([]);

      const safeName = getSafeBaseName(id);

      try {
        // 🔹 Fetch principal : données complètes de la forme actuelle
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

        // 🔹 Fetch de l'espèce (sécurisé avec try/catch)
        let speciesRes;
        try {
          speciesRes = await fetchSpecies(safeName);
          setSpecies(speciesRes.data);

          const formList = speciesRes.data.varieties.map(v => v.pokemon.name);
          setForms(formList);
        } catch (e) {
          console.warn(`❗ Espèce introuvable pour ${safeName}`);
          setSpecies(null); // 🔐 évite les crashes dans les composants dépendants
          setForms([]); // aucun bouton de forme affiché
        }
      } catch (err) {
        console.error('Erreur chargement détail Pokémon:', err);
        setError(true);
      }
    };

    fetchData();
  }, [id]);

  return { pokemon, species, error, isFallback, forms };
}
