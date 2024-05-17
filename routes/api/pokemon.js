const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../../controllers/api/pokemon');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/pokemon'

router.get('/pokemonParty', ensureLoggedIn, pokemonCtrl.getFavoritesList);
router.get('/:offset', pokemonCtrl.searchApi);
router.get('/pokemon/:pokemonId', ensureLoggedIn, pokemonCtrl.getBio);
router.post('/', ensureLoggedIn, pokemonCtrl.addFavoritePokemon);
router.post('/pokemonParty/remove', ensureLoggedIn, pokemonCtrl.removeFavoritePokemon);


module.exports = router;