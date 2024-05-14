import { Link } from 'react-router-dom';
import './PokemonListPage.css';

export default function PokemonList({ pokemonList, setPokemonCard }){

    function handleSelectPokemon(pokemon){
        setPokemonCard(pokemon)
    }
    return(
        <div className="pokemon-grid">
            {pokemonList.map((pokemon, idx)=> (
                <>
                <Link to={`/pokemon/${ pokemon.id }`} onClick={handleSelectPokemon} key={idx} >
                    <div className="pokemon-card" key={idx}>
                        <h3>{pokemon.name}</h3>
                        <span># {pokemon.id}</span>
                        <img src={pokemon.sprites.front_default} alt="" key={idx}/>
                    </div>
                </Link>
                </>
            ))}
        </div>
    )
}