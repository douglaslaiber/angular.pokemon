import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonDetailState } from './pokemon-detail.reducer';

export const selectPokemonDetailState =
  createFeatureSelector<PokemonDetailState>('pokemonDetail');

export const selectPokemonDetail = createSelector(
  selectPokemonDetailState,
  (state: PokemonDetailState) => state.pokemon
);
