const BASE_URL = 'https://pokeapi.co/api/v2'

const API = {
  GET_POKEMON_LIST: (size = 100) => `${BASE_URL}/pokemon?limit=${size}`,
  GET_POKEMON_DATA: (name) => `${BASE_URL}/pokemon/${name}`,
  GET_POKEMON_DESCRIPTION: (id) => `${BASE_URL}/pokemon-species/${id}`,
}

export default API
