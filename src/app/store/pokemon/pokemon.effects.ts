import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { PokemonApiService } from '../../core/services/pokemon-api.service';
import * as PokemonActions from './pokemon.actions';

@Injectable()
export class PokemonEffects {
  private actions$ = inject(Actions);
  private pokemonApiService = inject(PokemonApiService);

  loadPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      switchMap(() =>
        this.pokemonApiService
          .getAllPokemons()
          .pipe(
            map(data =>
              PokemonActions.loadPokemonsSuccess({ pokemons: data.results })
            )
          )
      )
    );
  });
}
