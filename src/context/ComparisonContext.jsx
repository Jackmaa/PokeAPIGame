import { createContext, useContext, useState } from 'react';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState([]);

  const toggleCompare = async pokemon => {
    const exists = comparisonList.some(p => p.name === pokemon.name);

    if (exists) {
      setComparisonList(prev => prev.filter(p => p.name !== pokemon.name));
    } else {
      // Ensure full Pokémon data is present (with stats)
      if (!pokemon.stats) {
        try {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`
          );
          const data = await res.json();
          const fullData = {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
            stats: data.stats,
            types: data.types,
          };
          setComparisonList(prev => [...prev, fullData].slice(0, 4));
        } catch (err) {
          console.error(`Failed to fetch full data for ${pokemon.name}`, err);
        }
      } else {
        setComparisonList(prev => [...prev, pokemon].slice(0, 4));
      }
    }
  };

  const removeFromCompare = id => {
    setComparisonList(prev => prev.filter(p => p.id !== id));
  };

  const clearCompare = () => setComparisonList([]);

  return (
    <ComparisonContext.Provider
      value={{ comparisonList, toggleCompare, clearCompare, removeFromCompare }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
