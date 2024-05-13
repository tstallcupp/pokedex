import { useState, useEffect } from "react";
import * as pokemonApi from '../../utilities/pokemon-api';


export default function PokemonList(){
    const [ pokemonList, setPokemonList ] = useState([])
    useEffect(() => {
        async function getAll() {
            const pokemon = await pokemonApi.getPokemon();
            setPokemonList(pokemon);
        }
        getAll();
    }, [])
    
    return(
        <div>
            {pokemonList.map(pokemon => (
                <img src={pokemon.sprites.front_default} alt="" />
            ))}
        </div>
    )
}