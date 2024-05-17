import {  useEffect } from 'react';
import * as pokemonApi from '../../utilities/pokemon-api';
import { Link } from 'react-router-dom';

export default function FavoritesListPage({ onPokemonSelect, pokemonParty, setPokemonParty, formatPokemonId }) {


  useEffect(() => {
    async function getFavoritesList() {
      const favorites = await pokemonApi.getPokemonParty();
      setPokemonParty(favorites);
      console.log("favorites LIst: ", favorites);
    }
    getFavoritesList();
  }, [])

  
  return (
    <>
      <h1>Favorites List Page</h1>
      <div className='pokemon-grid'>
        {pokemonParty.map(pokemon => (
          <Link to={`/pokemon/${ pokemon.name }`} onClick={() => onPokemonSelect(pokemon)} >
            <div key={ pokemon.name } className='pokemon-card'>
              <h3>{pokemon.name}</h3>
              <p>{formatPokemonId(pokemon.pokemonId)}</p>
              <img className="card-img-top" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} height="200px" alt="pokemoncard"/>
              <div className='favorite-btn'>
                <div className='heart-bg'>
                  <div className='heart-icon-favorited'>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )) }
      </div>

    </>
  );
}