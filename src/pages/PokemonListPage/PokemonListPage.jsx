import { Link } from 'react-router-dom';
import { useState } from 'react';
import './PokemonListPage.css';

import * as pokemonApi from '../../utilities/pokemon-api';

export default function PokemonList({ pokemonList, formatPokemonId, onPokemonSelect }){

    const [ favorite, setFavorite ] = useState(false);

    function handleSelectPokemon(pokemon){
        onPokemonSelect(pokemon);
    }

    // const handleFavorite = async (pokemon) => {
    //     try {
    //         await pokemonApi.addFavoritePokemon(pokemon.id);
    //     }catch (error) {
    //         console.log('Error favoriting Pokemon', error);
    //     }
    // }
    return(
        <ul className="pokemon-grid">
            {pokemonList.map((pokemon, idx)=> (
                <>
                    <li className="pokemon-card" key={idx}>
                        <Link className="pokemon-card-link" to={`/pokemon/${ pokemon.name }`} onClick={() => handleSelectPokemon(pokemon)} key={idx} >
                            <img className="card-img-top" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} height="200px" alt="pokemoncard"/>
                            <p>{formatPokemonId(pokemon.id)}</p>
                            <h3>{pokemon.name}</h3>
                            {/* <img src={pokemon.sprites.front_default} alt="" key={idx}/> */}
                        </Link>
                        {/* <Link>
                        <button onClick={()=>handleFavorite(pokemon)}>ADD TO FAVORITES</button>
                        </Link> */}
                    </li>
                </>
            ))}
        </ul>
    )
}