import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import * as PokemonSelectors from '@store/pokemon/pokemon.selectors';
import { IPokemon } from '../../../shared/models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class FilterPokemonService {
  private store = inject(Store);
  private pokemons$!: Observable<IPokemon[]>;

  constructor() {
    this.pokemons$ = this.store.select(PokemonSelectors.selectPokemons);
  }

  filter$(pokemonName: string | null) {
    return this.pokemons$.pipe(
      map(pokemons =>
        pokemons.filter(pokemon => pokemon.name.includes(pokemonName || ''))
      )
    );
  }
}
