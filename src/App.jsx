import { useState } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState("");

  const triggerError = (message) => {
    setPokemonData(null);
    setError(`⚠️ ${message}`);
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      setPokemonData(response.data);
      setError("");
    } catch (error) {
      setPokemonData(null);
      triggerError("❌ Pokémon not found. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Pokedex 🔴🟡🔵</h1>
      <SearchBar onSearch={handleSearch} onError={triggerError} />
      {error && <p className="error-message">{error}</p>}
      {pokemonData && <PokemonCard data={pokemonData} />}
    </div>
  );
}

export default App;
