import { PokemonDetailState } from './pokemon-detail/pokemon-detail.reducer';
import { PokemonState } from './pokemon/pokemon.reducer';

export interface AppState {
  pokemon: PokemonState;
  pokemonDetail: PokemonDetailState;
}
