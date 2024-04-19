import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';

import {
  heroEye,
  heroMagnifyingGlass,
  heroStar,
} from '@ng-icons/heroicons/outline';
import { heroStarSolid } from '@ng-icons/heroicons/solid';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { PokemonDetailEffects } from '@store/pokemon-detail/pokemon-detail.effects';
import { pokemonDetailReducer } from '@store/pokemon-detail/pokemon-detail.reducer';
import { PokemonEffects } from '@store/pokemon/pokemon.effects';
import { pokemonReducer } from '@store/pokemon/pokemon.reducer';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      pokemon: pokemonReducer,
      pokemonDetail: pokemonDetailReducer,
    }),
    provideEffects([PokemonEffects, PokemonDetailEffects]),
    provideIcons({ heroStar, heroStarSolid, heroMagnifyingGlass, heroEye }),
    provideHttpClient(),
    provideEffects(),
  ],
};
