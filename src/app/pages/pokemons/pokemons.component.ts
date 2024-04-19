import { AsyncPipe, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { map, Observable, tap } from 'rxjs';
import { IPokemon } from '../../shared/models/pokemon.model';
import { AppState } from '../../store/app.state';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';

import * as PokemonActions from '../../store/pokemon/pokemon.actions';
import * as PokemonSelectors from '../../store/pokemon/pokemon.selectors';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss',
  standalone: true,
  imports: [
    NgForOf,
    PokemonCardComponent,
    PaginationModule,
    AsyncPipe,
    FormsModule,
    SearchBarComponent,
    NgIf,
    SlicePipe,
  ],
  providers: [BsModalService],
})
export class PokemonsComponent implements OnInit {
  public itemsPerPage = 8;
  public currentPage = 1;

  public pokemons$!: Observable<IPokemon[]>;
  public filteredPokemons$!: Observable<IPokemon[]>;

  private store = inject(Store<AppState>);

  ngOnInit() {
    this.store.dispatch(PokemonActions.loadPokemons());
    this.pokemons$ = this.store.select(PokemonSelectors.selectPokemons);

    this.onSearch(null);
  }

  onSearch(value: string | null) {
    this.currentPage = 1;
    this.filteredPokemons$ = this.pokemons$.pipe(
      map(pokemons =>
        pokemons.filter(pokemon => pokemon.name.includes(value || ''))
      )
    );
  }

  onFavoritePokemon(pokemonName: string) {
    this.store.dispatch(PokemonActions.favoritePokemon({ pokemonName }));
  }
}
