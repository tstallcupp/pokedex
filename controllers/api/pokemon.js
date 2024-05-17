
const Pokemon = require('../../models/pokemon');
const fetch = require('node-fetch');

const pokemonApi = 'https://pokeapi.co/api/v2/pokemon?limit=50';
const pokemonSpeciesApi = 'https://pokeapi.co/api/v2/pokemon-species'

module.exports = {
 searchApi,
 getBio,
 addFavoritePokemon,
 getFavoritesList,
 removeFavoritePokemon,
};

async function removeFavoritePokemon(req, res) {
    try {
        const pokemon = await Pokemon.findOne({ pokemonId: req.body.pokemonID })
        pokemon.favorites.remove(req.user._id);
        await pokemon.save();
        res.json(pokemon);
    } catch ( error ) {
        console.log('Error removing favorite Pokemon', error);
        res.status(500).json({ message: 'Internal server error'})
    }
}

async function getFavoritesList(req, res) {
    const pokemonParty = await Pokemon.find({ favorites: req.user._id})
    res.json(pokemonParty)
}

async function addFavoritePokemon(req, res) {
    let favoritePokemon = await Pokemon.findOne({name: req.body.pokemonProperties.name});
    if (!favoritePokemon) {
        favoritePokemon = new Pokemon(req.body.pokemonProperties);
    } else if (favoritePokemon.favorites.includes(req.user._id)) return; 
    favoritePokemon.favorites.push(req.user._id);
    await favoritePokemon.save();
    res.json(favoritePokemon);
}

async function searchApi(req, res){
    try {
        const pokemonList = await fetch(`${pokemonApi}&offset=${req.params.offset}`).then(res => res.json());
        const pokemonData = pokemonList.results.map(pokemon => {
            const p = fetch(pokemon.url).then(res => res.json()).then(data => data);
            return p;
        });
        const results = await Promise.all(pokemonData)
        res.json(results);
    } catch ( error ) {
        res.status(400).json({ message: 'Error fetching Pokemon API'})
    }
}

async function getBio(req, res) {
    const pokemonSpecies = await fetch(`${pokemonSpeciesApi}/${req.params.pokemonId}`).then(res => res.json()).then(data => data);

    const flavorText = pokemonSpecies.flavor_text_entries[0].flavor_text;
    const cleanedFlavorText = flavorText.replace(/[\n+\f]/g, ' ');
    res.json(cleanedFlavorText);
}