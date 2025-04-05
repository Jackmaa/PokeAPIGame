import { useState, useEffect } from "react";
import TypeFilter from "./TypeFilter";
import PokemonCard from "./PokemonCard";
import axios from "axios";

function PokedexGrid() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);

  // Reset limit on type change
  useEffect(() => {
    setLimit(20);
  }, [selectedType]);

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
            .map((p) => p.pokemon)
            .slice(0, limit);

          const detailedData = await Promise.all(
            pokemonsOfType.map((p) =>
              axios
                .get(p.url)
                .then((res) => res.data)
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
            results.map((p) =>
              axios
                .get(p.url)
                .then((res) => res.data)
                .catch(() => null)
            )
          );

          fetchedData = detailedData.filter(Boolean);
        }

        setPokemonList(fetchedData);
        setLoading(false);

        // ✅ Restore scroll position
        const savedScroll = sessionStorage.getItem("pokedexScroll");
        if (savedScroll) {
          requestAnimationFrame(() => {
            setTimeout(() => {
              window.scrollTo({
                top: parseInt(savedScroll),
                behavior: "instant", // or "auto"
              });
              sessionStorage.removeItem("pokedexScroll");
            }, 100); // Give layout time to render
          });
        }
      } catch (err) {
        console.error("Error loading Pokémon:", err);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [selectedType, limit]);

  if (loading) return <div className="pokeball-spinner"></div>;

  return (
    <>
      <TypeFilter onSelectType={setSelectedType} selectedType={selectedType} />
      <div className="pokedex-grid">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} data={pokemon} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          className="load-more-button"
          onClick={() => {
            sessionStorage.setItem("pokedexScroll", window.scrollY);
            setLimit(limit + 20);
          }}
        >
          Load More
        </button>
      </div>
    </>
  );
}

export default PokedexGrid;
