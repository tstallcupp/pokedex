const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../../controllers/api/pokemon');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/pokemon'

router.get('/pokemonParty', pokemonCtrl.getFavoritesList);
router.get('/:offset', pokemonCtrl.searchApi);
router.get('/pokemon/:pokemonId', pokemonCtrl.getBio);
router.post('/', pokemonCtrl.addFavoritePokemon);
router.post('/pokemonParty/remove', pokemonCtrl.removeFavoritePokemon);


module.exports = router;