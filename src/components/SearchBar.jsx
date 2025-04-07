import { useState, useEffect } from "react";
import usePokemonNames from "../hooks/usePokemonNames";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { AnimatePresence, motion } from "framer-motion";

function SearchBar({ onSearch, onError }) {
  const [input, setInput] = useState("");
  const debouncedInput = useDebouncedValue(input, 200);
  const nameList = usePokemonNames(input.length >= 1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setShowSuggestions(debouncedInput.length > 0);
  }, [debouncedInput]);

  // ✅ Filter suggestions reactively
  const suggestions = nameList
    .filter((name) => name.startsWith(debouncedInput.toLowerCase()))
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
    <form
      onSubmit={handleSubmit}
      className="search-bar"
      role="search"
      aria-label="Pokémon Search"
      aria-expanded={showSuggestions}
      aria-controls="autocomplete-dropdown"
      aria-activedescendant={
        selectedIndex >= 0 ? suggestions[selectedIndex] : ""
      }
      aria-autocomplete="list"
    >
      <div
        className="input-wrapper"
        onBlur={() => setShowSuggestions(false)}
        onFocus={() => {
          if (input.length > 0) setShowSuggestions(true);
        }}
        tabIndex={-1} // make it focusable as a wrapper
      >
        <input
          type="text"
          placeholder="Search a Pokémon by name or ID"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={(e) => {
            if (!showSuggestions || suggestions.length === 0) return;

            if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : 0
              );
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedIndex((prev) =>
                prev > 0 ? prev - 1 : suggestions.length - 1
              );
            }

            if (e.key === "Enter" && selectedIndex >= 0) {
              e.preventDefault();
              const selected = suggestions[selectedIndex];
              setInput(selected);
              onSearch(selected);
              setShowSuggestions(false);
              setSelectedIndex(-1);
            }

            if (e.key === "Escape") {
              setShowSuggestions(false);
              setSelectedIndex(-1);
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

        <AnimatePresence>
          {showSuggestions && (
            <motion.ul
              className="autocomplete-dropdown"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {suggestions.length > 0 ? (
                suggestions.map((name, index) => (
                  <li
                    key={name}
                    className={index === selectedIndex ? "selected" : ""}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onMouseDown={() => {
                      // Use mouseDown instead of click to prevent onBlur firing first
                      setInput(name);
                      onSearch(name);
                      setShowSuggestions(false);
                      setSelectedIndex(-1);
                    }}
                  >
                    {name}
                  </li>
                ))
              ) : (
                <li className="no-match">No matches found</li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export default SearchBar;
