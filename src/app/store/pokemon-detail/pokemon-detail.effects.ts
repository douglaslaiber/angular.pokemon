import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { PokemonApiService } from '../../core/services/pokemon-api.service';
import * as PokemonDetailActions from './pokemon-detail.actions';

@Injectable()
export class PokemonDetailEffects {
  private actions$ = inject(Actions);
  private pokemonApiService = inject(PokemonApiService);

  loadPokemonDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonDetailActions.loadPokemonDetail),
      switchMap(pokemonName => {
        return this.pokemonApiService
          .getPokemonDetail(pokemonName.pokemonName)
          .pipe(
            map(data =>
              PokemonDetailActions.loadPokemonDetailSuccess({ pokemon: data })
            )
          );
      })
    );
  });
}
