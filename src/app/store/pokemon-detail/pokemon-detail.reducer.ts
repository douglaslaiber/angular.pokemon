import { createReducer, on } from '@ngrx/store';
import { IPokemonDetail } from '../../shared/models/pokemon-detail.model';
import * as PokemonDetailActions from './pokemon-detail.actions';

export interface PokemonDetailState {
  pokemon: IPokemonDetail | null;
}

export const initialPokemonDetailState: PokemonDetailState = {
  pokemon: null,
};

export const pokemonDetailReducer = createReducer(
  initialPokemonDetailState,
  on(PokemonDetailActions.loadPokemonDetailSuccess, (state, { pokemon }) => ({
    ...state,
    pokemon,
  }))
);
