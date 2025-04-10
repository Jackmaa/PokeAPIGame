import React from 'react';

function MiniPokemonCard({ pokemon, onClick }) {
  return (
    <div
      className="mini-pokemon-card"
      onClick={() => onClick(pokemon.id)}
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
