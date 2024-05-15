import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as pokemonApi from '../../utilities/pokemon-api';

export default function PokemonDetailPage({ pokemonCard, formatPokemonId }){
    let { pokemonId } = useParams();
    
    const [pokemonBio, setPokemonBio ] = useState('');
    console.log(pokemonCard)
    useEffect(()=> {
        async function getPokemonBio() {
            const bio = await pokemonApi.getBio(pokemonId);
            setPokemonBio(bio);
        }
        getPokemonBio();
    }, [pokemonId])
    if (!pokemonCard) {
        return <div>Loading...</div>;
    }
    return (
        <>
        <div>
            <h3>{pokemonCard.name}</h3>
            <img src={pokemonCard.sprites.front_default} alt=""/>
            <p>{formatPokemonId(pokemonCard.id)}</p>
            <p>{pokemonBio}</p>
        </div>
        </>
    )
}