import { createAction, props } from '@ngrx/store';
import { IPokemon } from '../../shared/models/pokemon.model';

export const loadPokemons = createAction('[Pokemon] Load Pokemons');
export const loadPokemonsSuccess = createAction(
  '[Pokemon] Load Pokemons Success',
  props<{ pokemons: IPokemon[] }>()
);
export const filterPokemons = createAction(
  '[Pokemon] Filter Pokemons',
  props<{ pokemonName: string | null }>()
);

export const favoritePokemon = createAction(
  '[Pokemon] Favorite Pokemon',
  props<{ pokemonName: string }>()
);

export const addComment = createAction(
  '[Pokemon] Add Comment',
  props<{ pokemonName: string; author: string; comment: string }>()
);

export const removeComment = createAction(
  '[Pokemon] Remove Comment',
  props<{ pokemonName: string }>()
);
