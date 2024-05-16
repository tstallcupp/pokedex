const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../../controllers/api/pokemon');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/pokemon'

router.get('/', pokemonCtrl.searchApi);
router.get('/pokemonParty', pokemonCtrl.getFavoritesList);
router.get('/:pokemonId', pokemonCtrl.getBio);
router.post('/', pokemonCtrl.addFavoritePokemon);
router.post('/pokemonParty/remove', pokemonCtrl.removeFavoritePokemon);


module.exports = router;