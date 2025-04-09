import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

export const fetchPokemon = nameOrId =>
  axios.get(`${BASE_URL}pokemon/${nameOrId}`);

export const fetchSpecies = nameOrId =>
  axios.get(`${BASE_URL}pokemon-species/${nameOrId}`);

export const fetchEvolutionChain = url => axios.get(url);
