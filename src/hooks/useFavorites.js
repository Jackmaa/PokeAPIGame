// This hook manages a list of favorite Pokémon in local storage.
import { useEffect, useState } from 'react';

const FAVORITES_KEY = 'favorites';

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = id => favorites.some(p => p.id === id);

  const toggleFavorite = pokemon => {
    setFavorites(prev => {
      const exists = prev.some(p => p.id === pokemon.id);
      return exists
        ? prev.filter(p => p.id !== pokemon.id)
        : [...prev, pokemon];
    });
  };

  const clearFavorites = () => setFavorites([]);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}
