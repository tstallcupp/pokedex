import sendRequest from "./send-request";
const BASE_URL = '/api/pokemon';

export async function getPokemon(offset) {
  console.log('offset: ', offset)
  return sendRequest(`${BASE_URL}/${ offset }`);
}

export async function getBio(pokemonId){
  return sendRequest(`${BASE_URL}/pokemon/${pokemonId}`);
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
