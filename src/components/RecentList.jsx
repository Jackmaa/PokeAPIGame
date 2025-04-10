import React from 'react';
import { useNavigate } from 'react-router-dom';
import MiniPokemonCard from './MiniPokemonCard';

function RecentList({ recentSearches, onSearch }) {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: '1rem' }}>
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h4>Recently Viewed</h4>
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
      )}
    </div>
  );
}

export default RecentList;
