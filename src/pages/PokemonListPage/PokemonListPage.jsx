import { Link } from 'react-router-dom';
import './PokemonListPage.css';


export default function PokemonList({ pokemonList, formatPokemonId, onPokemonSelect }){

    function handleSelectPokemon(pokemon){
        onPokemonSelect(pokemon);
    }
    return(
        <ul className="pokemon-grid">
            {pokemonList.map((pokemon, idx)=> (
                <>
                    <li className="pokemon-card" key={idx}>
                        <Link className="pokemon-card-link" to={`/pokemon/${ pokemon.name }`} onClick={() => handleSelectPokemon(pokemon)} key={idx} >
                            <img className="card-img-top" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} height="200px" alt="pokemoncard"/>
                            <p>{formatPokemonId(pokemon.id)}</p>
                            <h3>{pokemon.name}</h3>
                        </Link>
                    </li>
                </>
            ))}
        </ul>
    )
}