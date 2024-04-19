import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemon',
    loadComponent: () =>
      import('./pages/pokemons/pokemons.component').then(
        m => m.PokemonsComponent
      ),
  },
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
];
