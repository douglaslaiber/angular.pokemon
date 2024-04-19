import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import {
  heroEye,
  heroMagnifyingGlass,
  heroStar,
} from '@ng-icons/heroicons/outline';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';

import { PokemonCardComponent } from './pokemon-card.component';
import * as PokemonActions from '../../../../store/pokemon/pokemon.actions';
import * as PokemonDetailActions from '../../../../store/pokemon-detail/pokemon-detail.actions';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let store: Store;
  let modalService: BsModalService;

  const initialState = { pokemons: null };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [
        provideMockStore({ initialState }),
        BsModalService,
        provideIcons({ heroStar, heroStarSolid, heroMagnifyingGlass, heroEye }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = {
      name: 'bulbasaur',
      url: 'url',
      favorite: false,
      comment: null,
    };
    store = TestBed.inject(Store);
    modalService = TestBed.inject(BsModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit favoritePokemon event when clickFavorite is called', () => {
    jest.spyOn(component.favoritePokemon, 'emit');
    component.clickFavorite();
    expect(component.favoritePokemon.emit).toHaveBeenCalledWith(
      component.pokemon.name
    );
  });

  it('should dispatch loadPokemonDetail action and open modal when openDetailsModal is called', () => {
    jest.spyOn(store, 'dispatch');
    jest.spyOn(modalService, 'show');
    component.openDetailsModal();
    expect(store.dispatch).toHaveBeenCalledWith(
      PokemonDetailActions.loadPokemonDetail({
        pokemonName: component.pokemon.name,
      })
    );
    expect(modalService.show).toHaveBeenCalled();
  });

  it('should open modal and dispatch addComment action when addComment is called', () => {
    jest.spyOn(modalService, 'show').mockReturnValue({
      content: { event: of({}) },
      hide: () => {},
      setClass: () => {},
    });
    jest.spyOn(store, 'dispatch');
    component.addComment();
    expect(modalService.show).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith({
      pokemonName: 'bulbasaur',
      type: '[Pokemon] Add Comment',
    });
  });

  it('should dispatch removeComment action when removeComment is called', () => {
    jest.spyOn(store, 'dispatch');
    component.removeComment();
    expect(store.dispatch).toHaveBeenCalledWith(
      PokemonActions.removeComment({ pokemonName: component.pokemon.name })
    );
  });
});
