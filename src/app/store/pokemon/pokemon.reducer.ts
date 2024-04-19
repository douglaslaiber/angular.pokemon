import { createReducer, on } from '@ngrx/store';
import { IPokemon } from '../../shared/models/pokemon.model';
import * as PokemonActions from './pokemon.actions';

export interface PokemonState {
  pokemons: IPokemon[];
}

export const initialPokemonState: PokemonState = {
  pokemons: [],
};

export const pokemonReducer = createReducer(
  initialPokemonState,
  on(PokemonActions.loadPokemonsSuccess, (state, { pokemons }) => ({
    ...state,
    pokemons,
  })),
  on(PokemonActions.favoritePokemon, (state, { pokemonName }) => {
    const pokemons = state.pokemons.map(pokemon =>
      pokemon.name === pokemonName
        ? { ...pokemon, favorite: !pokemon.favorite }
        : pokemon
    );

    return {
      ...state,
      pokemons,
    };
  }),
  on(PokemonActions.addComment, (state, { pokemonName, author, comment }) => {
    const pokemons = state.pokemons.map(pokemon =>
      pokemon.name === pokemonName
        ? {
            ...pokemon,
            comment: { author, comment },
          }
        : pokemon
    );

    return {
      ...state,
      pokemons,
    };
  }),
  on(PokemonActions.removeComment, (state, { pokemonName }) => {
    const pokemons = state.pokemons.map(pokemon =>
      pokemon.name === pokemonName ? { ...pokemon, comment: null } : pokemon
    );

    return {
      ...state,
      pokemons,
    };
  })
);
