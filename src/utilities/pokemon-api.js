import sendRequest from "./send-request";
const BASE_URL = '/api/pokemon';

export async function getPokemon() {
  return sendRequest(BASE_URL);
}

export async function getBio(pokemonId){
  return sendRequest(`${BASE_URL}/${pokemonId}`);
}

export async function addFavoritePokemon(pokemonProperties){
  return sendRequest(BASE_URL, 'POST', {pokemonProperties});
}
export async function getPokemonParty(){
  return sendRequest(`${BASE_URL}/pokemonParty`);
}

export async function removeFavoritePokemon(pokemonID) {
  return sendRequest(`${BASE_URL}/pokemonParty/remove`, 'POST', { pokemonID });
}
