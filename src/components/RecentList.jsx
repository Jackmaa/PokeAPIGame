import React from 'react';
import { useNavigate } from 'react-router-dom';
import MiniPokemonCard from './MiniPokemonCard';

function RecentList({ recentSearches, setRecentSearches }) {
  const navigate = useNavigate();

  if (!recentSearches?.length) return null;

  const handleClear = () => {
    sessionStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  return (
    <details open>
      <summary
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>🕘 Recently Viewed</span>
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            handleClear();
          }}
          className="reset-btn"
        >
          Reset
        </button>
      </summary>

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
