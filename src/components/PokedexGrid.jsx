import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";

function PokedexGrid() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const results = res.data.results;

        const detailedData = await Promise.all(
          results.map(
            (p) =>
              axios
                .get(p.url)
                .then((res) => res.data)
                .catch(() => null) // ← ignore bad fetches
          )
        );
        setPokemonList(detailedData.filter(Boolean)); // ← remove null entries
        setLoading(false);
      } catch (err) {
        console.error("Failed to load Pokémon:", err);
      }
    };

    fetchAllPokemon();
  }, []);

  if (loading) return <p>Loading Pokémon...</p>;

  return (
    <div className="pokedex-grid">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} data={pokemon} />
      ))}
    </div>
  );
}

export default PokedexGrid;
