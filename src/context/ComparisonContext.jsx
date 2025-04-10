// src/context/ComparisonContext.jsx
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

  const clearCompare = () => setComparisonList([]);

  return (
    <ComparisonContext.Provider
      value={{ comparisonList, toggleCompare, clearCompare }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
