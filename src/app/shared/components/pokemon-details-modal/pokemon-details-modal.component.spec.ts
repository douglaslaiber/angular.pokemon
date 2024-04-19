import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { PokemonDetailsModalComponent } from './pokemon-details-modal.component';
import * as PokemonDetailSelectors from '../../../store/pokemon-detail/pokemon-detail.selectors';

describe('PokemonDetailsModalComponent', () => {
  let component: PokemonDetailsModalComponent;
  let fixture: ComponentFixture<PokemonDetailsModalComponent>;
  let store: Store;
  const initialState = {
    name: 'Pikachu',
    height: 0.4,
    weight: 6,
    base_experience: 112,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsModalComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select pokemon detail and update pokemon property when ngOnInit is called', () => {
    const mockPokemonDetail = {
      name: 'Pikachu',
      height: 0.4,
      weight: 6,
      base_experience: 112,
    };
    jest.spyOn(store, 'select').mockReturnValue(of(mockPokemonDetail));
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(
      PokemonDetailSelectors.selectPokemonDetail
    );
    expect(component.pokemon).toEqual(mockPokemonDetail);
  });
});
