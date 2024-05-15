import { Link } from 'react-router-dom';
import './PokemonListPage.css';

export default function PokemonList({ pokemonList, formatPokemonId, onPokemonSelect }){

    function handleSelectPokemon(pokemon){
        onPokemonSelect(pokemon);
        // console.log(pokemon)
    }
    return(
        <ul className="pokemon-grid">
            {pokemonList.map((pokemon, idx)=> (
                <>
                <Link to={`/pokemon/${ pokemon.id }`} onClick={() => handleSelectPokemon(pokemon)} key={idx} >
                    <li className="pokemon-card" key={idx}>
                        <h3>{pokemon.name}</h3>
                        <span>{formatPokemonId(pokemon.id)}</span>
                        <img src={pokemon.sprites.front_default} alt="" key={idx}/>
                    </li>
                </Link>
                </>
            ))}
        </ul>
    )
}