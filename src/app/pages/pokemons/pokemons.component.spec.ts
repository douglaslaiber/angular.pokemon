import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import {
  heroEye,
  heroMagnifyingGlass,
  heroStar,
} from '@ng-icons/heroicons/outline';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { IPokemon } from '../../shared/models/pokemon.model';

import { PokemonsComponent } from './pokemons.component';
import * as PokemonActions from '../../store/pokemon/pokemon.actions';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let store: MockStore;
  const initialState = { pokemons: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsComponent],
      providers: [
        provideMockStore({ initialState }),
        provideIcons({ heroStar, heroStarSolid, heroMagnifyingGlass, heroEye }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPokemons action on ngOnInit', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(PokemonActions.loadPokemons());
  });

  it('should filter pokemons on onSearch', () => {
    component.pokemons$ = of([
      { name: 'pikachu', url: 'url' } as IPokemon,
      { name: 'bulbasaur', url: 'url' } as IPokemon,
    ]);
    component.onSearch('pikachu');
    component.filteredPokemons$.subscribe(pokemons => {
      expect(pokemons).toEqual([{ name: 'pikachu', url: 'url' }]);
    });
  });

  it('should dispatch favoritePokemon action on onFavoritePokemon', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.onFavoritePokemon('pikachu');
    expect(dispatchSpy).toHaveBeenCalledWith(
      PokemonActions.favoritePokemon({ pokemonName: 'pikachu' })
    );
  });
});
