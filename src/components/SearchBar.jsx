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
      setInput("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search a pokemon by ID or name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" aria-label="Search">
        🔍
      </button>
    </form>
  );
}

export default SearchBar;
