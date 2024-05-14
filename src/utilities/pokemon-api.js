import sendRequest from "./send-request";
const BASE_URL = '/api/pokemon';

export async function getPokemon() {
  return sendRequest(BASE_URL);
}

export async function getBio(){
  return sendRequest(BASE_URL);
}