const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema  = new Schema({
    name: String,
    pokemonId: Number,
    bio: String,
    abilities: [],
    type: [],
    height: Number,
    weight: Number,
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})
module.exports = mongoose.model('Pokemon', pokemonSchema);