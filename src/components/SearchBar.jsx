import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import usePokemonNames from '../hooks/usePokemonNames';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { AnimatePresence, motion } from 'framer-motion';
import MiniPokemonCard from './MiniPokemonCard';

function SearchBar({ onError }) {
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState(() => {
    const stored = sessionStorage.getItem('recentSearches');
    return stored ? JSON.parse(stored) : [];
  });

  const debouncedInput = useDebouncedValue(input, 200);
  const nameList = usePokemonNames(input.length >= 1);
  const suggestions = useMemo(
    () =>
      nameList
        .filter(name => name.startsWith(debouncedInput.toLowerCase()))
        .slice(0, 5),
    [debouncedInput, nameList]
  );

  const showSuggestions = debouncedInput.length > 0;
  const navigate = useNavigate();

  const isValidInput = str => /^[a-zA-Z0-9]+$/.test(str);

  const handleSearchSelection = async name => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const data = await res.json();

      const formatted = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map(t => t.type.name),
      };

      const newRecent = [
        formatted,
        ...recentSearches.filter(p => p.name !== formatted.name),
      ].slice(0, 5);
      sessionStorage.setItem('recentSearches', JSON.stringify(newRecent));
      setRecentSearches(newRecent);

      navigate(`/pokemon/${formatted.name}`);
    } catch {
      onError(`Could not find Pokémon: "${name}"`);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSearchSelection(suggestions[selectedIndex]);
      setInput(suggestions[selectedIndex]);
      setSelectedIndex(-1);
    } else if (e.key === 'Escape') {
      setInput('');
      setSelectedIndex(-1);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || !isValidInput(trimmed)) {
      onError(
        'Please enter a valid Pokémon name or ID (letters and numbers only).'
      );
      return;
    }
    handleSearchSelection(trimmed);
  };

  const [pokemonCache, setPokemonCache] = useState({});
  useEffect(() => {
    const fetchSuggestionsData = async () => {
      const newCache = { ...pokemonCache };
      const missing = suggestions.filter(name => !newCache[name]);

      const fetches = await Promise.all(
        missing.map(async name => {
          try {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${name}`
            );
            const data = await res.json();
            return {
              name,
              data: {
                id: data.id,
                name: data.name,
                sprite: data.sprites.front_default,
                types: data.types.map(t => t.type.name),
              },
            };
          } catch {
            return null;
          }
        })
      );

      fetches.forEach(entry => {
        if (entry) newCache[entry.name] = entry.data;
      });

      setPokemonCache(newCache);
    };

    if (suggestions.length > 0) {
      fetchSuggestionsData();
    }
  }, [suggestions]);

  const SuggestionList = () => {
    if (suggestions.length === 0) {
      return (
        <motion.li
          key="no-results"
          className="no-match"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ padding: '0.5rem', textAlign: 'center', color: '#888' }}
        >
          No Pokémon found 😢
        </motion.li>
      );
    }

    return suggestions.map((name, index) => (
      <li
        key={name}
        className={index === selectedIndex ? 'selected' : ''}
        onMouseEnter={() => setSelectedIndex(index)}
        onClick={() => {
          setInput(name);
          handleSearchSelection(name);
          setSelectedIndex(-1);
        }}
        aria-selected={index === selectedIndex}
      >
        {pokemonCache[name] ? (
          <MiniPokemonCard
            pokemon={pokemonCache[name]}
            onClick={() => {}}
            disableInteraction={true}
          />
        ) : (
          name
        )}
      </li>
    ));
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
        selectedIndex >= 0 ? suggestions[selectedIndex] : ''
      }
      aria-autocomplete="list"
    >
      <div
        className="input-wrapper"
        onBlur={() => setSelectedIndex(-1)}
        onFocus={() => input.length > 0 && setSelectedIndex(-1)}
        tabIndex={-1}
      >
        <input
          type="text"
          placeholder="Search a Pokémon by name or ID"
          value={input}
          onChange={e => {
            setInput(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />

        {input && (
          <button
            type="button"
            className="clear-button"
            onClick={() => {
              setInput('');
              setSelectedIndex(-1);
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
              <SuggestionList />
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export default SearchBar;
