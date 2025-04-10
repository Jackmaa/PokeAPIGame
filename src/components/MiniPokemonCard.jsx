import React from 'react';

function MiniPokemonCard({ pokemon, onClick, disableInteraction = false }) {
  return (
    <div
      className="mini-pokemon-card"
      onClick={() => !disableInteraction && onClick?.(pokemon.id)}
      style={{
        pointerEvents: disableInteraction ? 'none' : 'auto',
      }}
      title={`View ${pokemon.name}`}
    >
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className="mini-pokemon-img"
      />
      <span className="mini-pokemon-name">{pokemon.name}</span>
    </div>
  );
}

export default MiniPokemonCard;
