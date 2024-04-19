import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { FilterPokemonService } from './filter-pokemon.service';

describe('FilterPokemonService', () => {
  let service: FilterPokemonService;
  let store: Store;
  const initialState = { pokemons: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterPokemonService, provideMockStore({ initialState })],
    });
    service = TestBed.inject(FilterPokemonService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return filtered pokemons when filter$ is called', () => {
    const mockPokemons = [
      { name: 'Pikachu' },
      { name: 'Charmander' },
      { name: 'Bulbasaur' },
    ];
    jest.spyOn(store, 'select').mockReturnValue(of(mockPokemons));
    service.filter$('Char').subscribe(filteredPokemons => {
      expect(filteredPokemons).toEqual([{ name: 'Charmander' }]);
    });
  });
});
