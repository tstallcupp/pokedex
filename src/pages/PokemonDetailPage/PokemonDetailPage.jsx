import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as pokemonApi from '../../utilities/pokemon-api';

export default function PokemonDetailPage({ pokemonList, pokemonCard }){
    let { pokemonId } = useParams();
    
    const [pokemonBio, setPokemonBio ] = useState('');
    let singlePokemon = pokemonList.find(pokemon => pokemon.id === parseInt(pokemonId));
    console.log('single pokemon: ', singlePokemon)
    useEffect(()=> {
        async function getBio() {
            const pokemonBio = await pokemonApi.getBio();
            setPokemonBio(pokemonBio);
        }
        getBio();
    }, [])
    if (!singlePokemon) {
        return <div>Loading...</div>;
    }
    return (
        <>
        <div>
            <h3>{singlePokemon.name}</h3>
            <span># {singlePokemon.id}</span>
            <img src={singlePokemon.sprites.front_default} alt=""/>
            <p>HELLO THERE</p>
            {/* <p>{pokemonBio}</p> */}
        </div>
        </>
    )
}