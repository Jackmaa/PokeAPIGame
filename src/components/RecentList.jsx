import React from 'react';
import { useNavigate } from 'react-router-dom';
import MiniPokemonCard from './MiniPokemonCard';

function RecentList({ recentSearches }) {
  const navigate = useNavigate();

  if (!recentSearches?.length) return null;

  return (
    <details>
      <summary>🕘 Recently Viewed</summary>
      <div className="recent-searches">
        <div className="mini-list">
          {recentSearches.map(poke => (
            <MiniPokemonCard
              key={poke.id}
              pokemon={poke}
              onClick={() => navigate(`/pokemon/${poke.name}`)}
            />
          ))}
        </div>
      </div>
    </details>
  );
}

export default RecentList;
