import { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed === "") return;
    const isValid = /^[a-zA-Z0-9]+$/.test(trimmed);
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
