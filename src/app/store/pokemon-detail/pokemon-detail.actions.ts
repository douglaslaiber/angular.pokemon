import { createAction, props } from '@ngrx/store';
import { IPokemonDetail } from '../../shared/models/pokemon-detail.model';

export const loadPokemonDetail = createAction(
  '[PokemonDetail] Load PokemonDetail',
  props<{ pokemonName: string }>()
);

export const loadPokemonDetailSuccess = createAction(
  '[PokemonDetail] Load PokemonDetail Success',
  props<{ pokemon: IPokemonDetail }>()
);
