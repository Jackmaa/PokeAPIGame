import { useState } from "react";

function SearchBar({ onSearch, onError }) {
  const [input, setInput] = useState("");

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
    }
  };
  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Search a Pokémon by name or ID"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <button
            type="button"
            className="clear-button"
            onClick={() => setInput("")}
            aria-label="Clear input"
          >
            ❌
          </button>
        )}
      </div>
      <button type="submit" aria-label="Search">
        🔍
      </button>
    </form>
  );
}

export default SearchBar;
