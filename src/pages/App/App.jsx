import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';


import NavBar from '../../components/NavBar/NavBar';

import * as pokemonApi from '../../utilities/pokemon-api';
import PokemonList from '../PokemonListPage/PokemonListPage';
import PokemonDetailPage from '../PokemonDetailPage/PokemonDetailPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  const [ pokemonList, setPokemonList ] = useState([])
  const [ pokemonCard, setPokemonCard ] = useState([])

    useEffect(() => {
        async function getAll() {
            const pokemon = await pokemonApi.getPokemon();
            setPokemonList(pokemon);
        }
        getAll();
    }, [])

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<PokemonList pokemonList={pokemonList} setPokemonCard={setPokemonCard} />} />
              <Route path="/pokemon/:pokemonId" element={<PokemonDetailPage pokemonList={pokemonList} pokemonCard={pokemonCard}/>} />
              {/* <Route path="/orders" element={<OrderHistoryPage />} /> */}
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
