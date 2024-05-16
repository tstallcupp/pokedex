import { useState, useEffect } from 'react';
import * as pokemonApi from '../../utilities/pokemon-api';

export default function FavoritesListPage({ formatPokemonId }) {
  const [ pokemonParty, setPokemonParty] = useState([])

  useEffect(() => {
    async function getFavoritesList() {
      const favorites = await pokemonApi.getPokemonParty();
      setPokemonParty(favorites);
      console.log(favorites);
    }
    getFavoritesList();
  }, [])
  
  return (
    <>
      <h1>Favorites List Page</h1>
      <div className='pokemon-grid'>
        {pokemonParty.map(pokemon => (
          <div key={ pokemon.name } className='pokemon-card'>
            <h3>{pokemon.name}</h3>
            <p>{formatPokemonId(pokemon.pokemonId)}</p>
            <img className="card-img-top" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} height="200px" alt="pokemoncard"/>
            <div className='favorite-btn'>
              <div className='heart-bg'>
                <div className='heart-icon'>
                </div>
              </div>
            </div>
          </div>
        )) }
      </div>

    </>
  );
}