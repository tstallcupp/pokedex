const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../../controllers/api/pokemon');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/pokemon'

router.get('/', pokemonCtrl.searchApi);


module.exports = router;