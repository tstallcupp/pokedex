const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema  = new Schema({
    name: { type: String, required: true },
    pokemonId: { type: Number, required: true },
    bio: String,
    abilities: String,
    type: String,
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]


    
})
module.exports = mongoose.model('Pokemon', pokemonSchema);