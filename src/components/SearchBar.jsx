import { useState } from "react";
import usePokemonNames from "../hooks/usePokemonNames";

function SearchBar({ onSearch, onError }) {
  const [input, setInput] = useState("");
  const nameList = usePokemonNames(input.length >= 1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ✅ Filter suggestions reactively
  const suggestions = nameList
    .filter((name) => name.startsWith(input.toLowerCase()))
    .slice(0, 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    const isValid = /^[a-zA-Z0-9]+$/.test(trimmed);

    if (trimmed === "" || !isValid) {
      onError(
        "Please enter a valid Pokémon name or ID (letters and numbers only)."
      );
      return;
    }
    if (isValid) {
      onSearch(trimmed.toLowerCase());
      setShowSuggestions(false); // Hide dropdown
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Search a Pokémon by name or ID"
          value={input}
          onChange={(e) => {
            const value = e.target.value;
            setInput(value);
            setShowSuggestions(value.length > 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setShowSuggestions(false);
              setInput("");
            }
          }}
        />

        {input && (
          <button
            type="button"
            className="clear-button"
            onClick={() => {
              setInput("");
              setShowSuggestions(false);
            }}
            aria-label="Clear input"
          >
            ❌
          </button>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <ul className="autocomplete-dropdown">
            {suggestions.map((name) => (
              <li
                key={name}
                onClick={() => {
                  setInput(name);
                  onSearch(name);
                  setShowSuggestions(false);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" aria-label="Search">
        🔍
      </button>
    </form>
  );
}

export default SearchBar;
