
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
    console.log(req.body)
    try {
        const pokemon = await Pokemon.findOne({ pokemonId: req.body.pokemonID })
        console.log(pokemon)
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
    console.log("Pokemon Party-----------",pokemonParty);
    res.json(pokemonParty)
}

async function addFavoritePokemon(req, res) {
    console.log(req.body.pokemonProperties.pokemonId)
    let favoritePokemon = await Pokemon.findOne({name: req.body.pokemonProperties.name});
    console.log("before create-----",favoritePokemon)
    if (!favoritePokemon) {
        favoritePokemon = new Pokemon(req.body.pokemonProperties);
    } else if (favoritePokemon.favorites.includes(req.user._id)) return; 
    favoritePokemon.favorites.push(req.user._id);
    await favoritePokemon.save();
    res.json(favoritePokemon);
}

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