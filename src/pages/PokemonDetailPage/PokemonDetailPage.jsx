import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as pokemonApi from '../../utilities/pokemon-api';
import './PokemonDetailPage.css';

export default function PokemonDetailPage({ pokemonCard, formatPokemonId }){
    const trueId = pokemonCard.pokemonId ? pokemonCard.pokemonId : pokemonCard.id
    let { pokemonId } = useParams();
    const [pokemonBio, setPokemonBio ] = useState('');
    const [ isFavorited, setIsFavorited ] = useState(false);


    useEffect(()=> {
        async function getPokemonBio() {
            const bio = await pokemonApi.getBio(pokemonId);
            setPokemonBio(bio);
            const pokemonParty = await pokemonApi.getPokemonParty();
            setIsFavorited(!!pokemonParty.find(({ pokemonId: partyId }) => (
                trueId === partyId
            )));
        }
        getPokemonBio();
    }, [pokemonId])
    if (!pokemonCard) {
        return <div>Loading...</div>;
    }

    const handleFavorite = async (pokemonCard) => {
        const pokemonProperties = {
            name: pokemonCard.name,
            pokemonId: trueId,
            bio: pokemonBio,
            abilities: pokemonCard.abilities,
            type: pokemonCard.types,
            height: pokemonCard.height,
            weight: pokemonCard.weight,
            sprites: { front_default : pokemonCard.sprites.front_default }
          }
        try {
            await pokemonApi.addFavoritePokemon(pokemonProperties);
            setIsFavorited(true);
        }catch (error) {
            console.log('Error favoriting Pokemon', error);
        }
    }

    const handleRemoveFavorite = async(pokemonCard) => {
        try {
            await pokemonApi.removeFavoritePokemon(trueId);
            setIsFavorited(false);
        } catch (error) {
            console.log('Error unfavoriting Pokemon')
        }
    }

    async function handleFavoriteClick(pokemonCard){
        if ( isFavorited ) await handleRemoveFavorite(pokemonCard);
        else { await handleFavorite(pokemonCard) };
    }

    const getAbilities = function(pokemonCard) {
        return pokemonCard.abilities.map((abilityObj, idx) => {
            const { name } = abilityObj.ability;
            return <li>{ name }</li>
        })
    }

    const getType = function(pokemonCard) {
        return pokemonCard.types.map((typeObj, idx) => {
            const { name } = typeObj.type;
            return <li>{ name }</li>
        })
    }

    return (
        <>
        <div className="detail-page-container">
            <div className="detail-page">
                <img className="pokemon-go-img" src={`https://img.pokemondb.net/sprites/home/normal/${pokemonCard.name}.png`} alt={`${pokemonCard.name}`} />
                <div className="pokemon-info">
                    <h3>{pokemonCard.name}</h3>
                    <img src={pokemonCard.sprites.front_default} alt={`${pokemonCard.name}`}/>
                    <p>{formatPokemonId(trueId)}</p>
                    <p>{pokemonBio}</p>
                    <ul>{getAbilities(pokemonCard)}</ul>
                    <ul>
                        <li>Height: {(pokemonCard.height / 10).toFixed(1) } m.</li>
                        <li>Weight: {(pokemonCard.weight / 10).toFixed(1) } kg.</li>
                    </ul>

                </div>

                <div className='favorite-btn'onClick={()=> handleFavoriteClick(pokemonCard)}>
                    <div className='heart-bg'>
                        <div className={ `heart-icon${isFavorited? '-favorited' : ''}` }>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}