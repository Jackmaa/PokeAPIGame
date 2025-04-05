import { useState, useEffect } from "react";
import TypeFilter from "./TypeFilter";
import PokemonCard from "./PokemonCard";
import axios from "axios";

function PokedexGrid() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);

      try {
        if (selectedType) {
          // 🔥 Fetch Pokémon by TYPE
          const res = await axios.get(
            `https://pokeapi.co/api/v2/type/${selectedType}`
          );
          const pokemonsOfType = res.data.pokemon
            .slice(0, 20) // limit to 20 for performance
            .map((p) => p.pokemon);

          const detailedData = await Promise.all(
            pokemonsOfType.map((p) =>
              axios
                .get(p.url)
                .then((res) => res.data)
                .catch(() => null)
            )
          );

          setPokemonList(detailedData.filter(Boolean));
        } else {
          // 🌐 Fetch default 20 Pokémon (like before)
          const res = await axios.get(
            "https://pokeapi.co/api/v2/pokemon?limit=20"
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

          setPokemonList(detailedData.filter(Boolean));
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading Pokémon:", err);
      }
    };

    fetchPokemon();
  }, [selectedType]);

  if (loading) return <p>Loading Pokémon...</p>;

  return (
    <>
      <TypeFilter onSelectType={setSelectedType} />
      <div className="pokedex-grid">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} data={pokemon} />
        ))}
      </div>
    </>
  );
}

export default PokedexGrid;
