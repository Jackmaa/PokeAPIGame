import { useState, useEffect } from "react";
import TypeFilter from "./TypeFilter";
import SearchBar from "./SearchBar"; // Don't forget this!
import PokemonCard from "./PokemonCard";
import axios from "axios";

function PokedexGrid() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(20);
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

        if (searchTerm) {
          try {
            const res = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
            );
            fetchedData = [res.data];
          } catch (err) {
            console.error("Error fetching Pokémon by ID or name:", err);
            setLoading(false);
          }
        }

        setPokemonList(fetchedData);
        setLoading(false);

        // Restore scroll
        const savedScroll = sessionStorage.getItem("pokedexScroll");
        if (savedScroll) {
          requestAnimationFrame(() => {
            setTimeout(() => {
              window.scrollTo({
                top: parseInt(savedScroll),
                behavior: "instant",
              });
              sessionStorage.removeItem("pokedexScroll");
            }, 100);
          });
        }
      } catch (err) {
        console.error("Error loading Pokémon:", err);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [selectedType, limit, searchTerm]);

  // ✅ Filtered Pokémon based on search term
  const filteredList = searchTerm
    ? pokemonList // already filtered by direct fetch
    : pokemonList.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (loading) return <div className="pokeball-spinner"></div>;

  return (
    <>
      <SearchBar
        onSearch={(value) => {
          setSearchTerm(value);
          setSelectedType(null);
        }}
      />
      <TypeFilter
        onSelectType={(type) => {
          setSearchTerm("");
          setLimit(20);
          setSelectedType(type);
        }}
        selectedType={selectedType}
      />
      <div className="pokedex-grid">
        {filteredList.map((pokemon) => (
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
