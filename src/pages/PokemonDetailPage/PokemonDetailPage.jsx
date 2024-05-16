import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as pokemonApi from '../../utilities/pokemon-api';

export default function PokemonDetailPage({ pokemonCard, formatPokemonId }){
    let { pokemonId } = useParams();
    const [pokemonBio, setPokemonBio ] = useState('');


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

    const handleRemoveFavorite = async(pokemonCard) => {
        try {
            console.log(pokemonCard.id)
            let pokemonID = pokemonCard.id
            await pokemonApi.removeFavoritePokemon(pokemonID);
        } catch (error) {
            console.log('Error unfavoriting Pokemon')
        }
    }

    const getAbilities = function(pokemonCard){
        pokemonCard.abilities.map((abilityObj, idx) => {
            const { name } = abilityObj.ability;
            console.log("ability name: ", name)
        })
    }
    console.log(pokemonCard.abilities)

    return (
        <>
        <div>
            <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemonCard.name}.png`} alt={`${pokemonCard.name}`} />
            <div className="pokemon-info">
                <h3>{pokemonCard.name}</h3>
                <img src={pokemonCard.sprites.front_default} alt={`${pokemonCard.name}`}/>
                <p>{formatPokemonId(pokemonCard.id)}</p>
                <p>{pokemonBio}</p>
                <p>{getAbilities(pokemonCard)}</p>
            </div>

            <div className='favorite-btn'>
              <div className='heart-bg'>
                <div className='heart-icon'>
                </div>
              </div>
            </div>
            <button onClick={()=>handleFavorite(pokemonCard)}>ADD TO FAVORITES</button>
            <button onClick={()=> handleRemoveFavorite(pokemonCard)}>REMOVE FAVORITE</button>
        </div>
        </>
    )
}