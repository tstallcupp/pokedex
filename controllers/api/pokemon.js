
const Pokemon = require('../../models/pokemon');
const fetch = require('node-fetch');

const pokemonApi = 'https://pokeapi.co/api/v2/pokemon?limit=50';
const pokemonSpeciesApi = 'https://pokeapi.co/api/v2/pokemon-species'

module.exports = {
 searchApi,
 getBio,
};

async function searchApi(req, res){
    const pokemonList = await fetch(`${pokemonApi}&offset=${0}`).then(res => res.json());
    const pokemonData = pokemonList.results.map(pokemon => {
        const p = fetch(pokemon.url).then(res => res.json()).then(data => data);
        return p;
    });
    const results = await Promise.all(pokemonData)
    res.json(results);
}

async function getBio(req, res) {
    const pokemonSpecies = await fetch(`${pokemonSpeciesApi}/${req.params.pokemonId}`).then(res => res.json()).then(data => data);

    const flavorText = pokemonSpecies.flavor_text_entries[0].flavor_text;
    const cleanedFlavorText = flavorText.replace(/[\n+\f]/g, ' ');
    // console.log(pokemonSpecies)
    res.json(cleanedFlavorText);

}