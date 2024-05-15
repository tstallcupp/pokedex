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

    const handleFavorite = async (pokemonCard) => {
        console.log(pokemonCard)
        const pokemonProperties = {
            name: pokemonCard.name,
            pokemonId: pokemonCard.id,
            bio: pokemonBio,
            abilities: pokemonCard.abilities,
            type: pokemonCard.types,
            height: pokemonCard.height,
            weight: pokemonCard.weight 
          }
        try {
            await pokemonApi.addFavoritePokemon(pokemonProperties);
        }catch (error) {
            console.log('Error favoriting Pokemon', error);
        }
    }
    return (
        <>
        <div>
        <img
        className="card-img-top"
        src={`https://img.pokemondb.net/artwork/large/${pokemonCard.name}.jpg`}
        height="200px"
        alt="pokemoncard"
      />
            <h3>{pokemonCard.name}</h3>
            <img src={pokemonCard.sprites.front_default} alt=""/>
            <p>{formatPokemonId(pokemonCard.id)}</p>
            <p>{pokemonBio}</p>
            <button onClick={()=>handleFavorite(pokemonCard)}>ADD TO FAVORITES</button>
        </div>
        </>
    )
}