import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.reducer';

export const selectPokemonState =
  createFeatureSelector<PokemonState>('pokemon');

export const selectPokemons = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.pokemons
);
