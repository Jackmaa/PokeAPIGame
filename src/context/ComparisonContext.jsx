import { createContext, useContext, useState } from 'react';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState([]);

  const toggleCompare = pokemon => {
    setComparisonList(prev => {
      const exists = prev.some(p => p.name === pokemon.name);
      return exists
        ? prev.filter(p => p.name !== pokemon.name)
        : [...prev, pokemon].slice(0, 4); // optional max of 4
    });
  };

  const removeFromCompare = id => {
    setComparisonList(prev => prev.filter(p => p.id !== id));
  };

  const clearCompare = () => setComparisonList([]);

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
