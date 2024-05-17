import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';

import * as pokemonApi from '../../utilities/pokemon-api';
import PokemonList from '../PokemonListPage/PokemonListPage';
import PokemonDetailPage from '../PokemonDetailPage/PokemonDetailPage';
import FavoritesListPage from '../FavoritesListPage/FavoritesListPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  const [ pokemonList, setPokemonList ] = useState([]);
  const [ pokemonCard, setPokemonCard ] = useState(null);
  // const [ favoritesList, setfavoritesList ] = useState([])
  const [ pokemonParty, setPokemonParty] = useState([]);
  const [ offset, setOffset ] = useState(0);

  function handleOffset(){
    setOffset(offset + 50);
  };

  async function getAll() {
    const pokemon = await pokemonApi.getPokemon(offset);
    setPokemonList([...pokemonList, ...pokemon]);
    handleOffset();
  }

  useEffect(() => {
      getAll();
  }, []);

  const handleOnPokemonSelect = (pokemon) => {
    setPokemonCard(pokemon);
  }

  function formatPokemonId(id) {
    return `#${id.toString().padStart(4,'0')}`;
  }

  return (
    <main className="App">
      { user ?
          <div>
            <div className="nav-banner">
              <img src="images/banner.png" alt="" />
              <img src="images/banner2.png" alt="" />
            </div>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<PokemonList 
                pokemonList={pokemonList} 
                formatPokemonId={formatPokemonId} 
                onPokemonSelect={handleOnPokemonSelect} 
              />}/>

              <Route path="/pokemon/:pokemonId" 
                element={<PokemonDetailPage 
                  pokemonCard={pokemonCard} 
                  formatPokemonId={formatPokemonId}/>} 
                />

              <Route path="/pokemonParty" 
                element={<FavoritesListPage 
                  onPokemonSelect={handleOnPokemonSelect}
                  pokemonParty={ pokemonParty }
                  setPokemonParty={ setPokemonParty }
                  formatPokemonId={ formatPokemonId }/>} 
                />
            </Routes>
            <button onClick={getAll}>Load More</button>
          </div >
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
