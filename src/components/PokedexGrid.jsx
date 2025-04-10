import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { useComparison } from '../context/ComparisonContext';
import axios from 'axios';

function PokedexGrid({
  selectedType,
  searchTerm,
  onSelectType,
  limit,
  setLimit,
}) {
  const [pokemonList, setPokemonList] = useState([]);
  const { comparisonList, toggleCompare } = useComparison();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        let fetchedData = [];

        if (selectedType) {
          const res = await axios.get(
            `https://pokeapi.co/api/v2/type/${selectedType}`
          );
          const pokemonsOfType = res.data.pokemon
            .map(p => p.pokemon)
            .slice(0, limit);

          const detailedData = await Promise.all(
            pokemonsOfType.map(p =>
              axios
                .get(p.url)
                .then(res => res.data)
                .catch(() => null)
            )
          );

          fetchedData = detailedData.filter(Boolean);
        } else {
          const res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
          );
          const results = res.data.results;

          const detailedData = await Promise.all(
            results.map(p =>
              axios
                .get(p.url)
                .then(res => res.data)
                .catch(() => null)
            )
          );

          fetchedData = detailedData.filter(Boolean);
        }

        if (searchTerm) {
          try {
            const res = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
            );
            fetchedData = [res.data];
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error('❌ Pokémon not found:', err);
            setPokemonList([]);
            setLoading(false);
            return; // ✅ early exit if search fails
          }
        }

        setPokemonList(fetchedData);
        setLoading(false);

        // Restore scroll
        if (
          typeof sessionStorage !== 'undefined' &&
          typeof window !== 'undefined'
        ) {
          const savedScroll = sessionStorage.getItem('pokedexScroll');
          if (savedScroll) {
            if (typeof requestAnimationFrame !== 'undefined') {
              requestAnimationFrame(() => {
                setTimeout(() => {
                  window.scrollTo({
                    top: parseInt(savedScroll),
                    behavior: 'instant',
                  });
                  sessionStorage.removeItem('pokedexScroll');
                }, 100);
              });
            }
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error loading Pokémon:', err);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [selectedType, limit, searchTerm]);

  // ✅ Filtered Pokémon based on search term
  const filteredList = searchTerm
    ? pokemonList // already filtered by direct fetch
    : pokemonList.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (loading) return <div className="pokeball-spinner"></div>;

  return (
    <>
      <div className="pokedex-grid">
        {filteredList.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            data={pokemon}
            onSelectType={onSelectType}
            pokemon={pokemon} // ✅
            isSelected={comparisonList.some(p => p.name === pokemon.name)}
            onToggleCompare={() => toggleCompare(pokemon)}
          />
        ))}

        {!loading && pokemonList.length === 0 && searchTerm && (
          <p className="no-results">No results found for "{searchTerm}" 😢</p>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="load-more-button"
            onClick={() => {
              sessionStorage.setItem('pokedexScroll', window.scrollY);
              setLimit(limit + 20);
            }}
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
}

export default PokedexGrid;
