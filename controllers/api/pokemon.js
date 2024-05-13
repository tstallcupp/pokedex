
const Pokemon = require('../../models/pokemon');
const fetch = require('node-fetch');

const pokemonApi = 'https://pokeapi.co/api/v2/pokemon?limit=50';

module.exports = {
 searchApi
};

async function searchApi(req, res){
    const pokemonList = await fetch(`${pokemonApi}&offset=${0}`).then(res => res.json());
    const pokemonData = pokemonList.results.map(pokemon => {
        const p = fetch(pokemon.url).then(res => res.json()).then(data => data);
        console.log(p)
        return p;
    });
    const results = await Promise.all(pokemonData)
    console.log(results);
    res.json(results);
}