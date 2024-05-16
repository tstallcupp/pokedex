import { Link } from 'react-router-dom';
import { useState } from 'react';
import './PokemonListPage.css';

import * as pokemonApi from '../../utilities/pokemon-api';

export default function PokemonList({ pokemonList, formatPokemonId, onPokemonSelect }){

    const [ favorite, setFavorite ] = useState(false);

    function handleSelectPokemon(pokemon){
        onPokemonSelect(pokemon);
    }

    const handleFavorite = async (pokemon) => {
        try {
            await pokemonApi.addFavoritePokemon(pokemon.id);
        }catch (error) {
            console.log('Error favoriting Pokemon', error);
        }
    }
    return(
        <ul className="pokemon-grid">
            {pokemonList.map((pokemon, idx)=> (
                <>
                    <li className="pokemon-card" key={idx}>
                        <Link  to={`/pokemon/${ pokemon.name }`} onClick={() => handleSelectPokemon(pokemon)} key={idx} >
                            <h3>{pokemon.name}</h3>
                            <span>{formatPokemonId(pokemon.id)}</span>
                            {/* <img src={pokemon.sprites.front_default} alt="" key={idx}/> */}
                            <img className="card-img-top" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} height="200px" alt="pokemoncard"/>
                        </Link>
                        <Link>
                        <button onClick={()=>handleFavorite(pokemon)}>ADD TO FAVORITES</button>
                        <p>QUICK VIEW</p>
                        </Link>
                    </li>
                </>
            ))}
        </ul>
    )
}