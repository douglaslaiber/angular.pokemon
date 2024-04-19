import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonApiService } from './pokemon-api.service';
import { BASE_URL_API } from '../constants/api.constant';

describe('PokemonApiService', () => {
  let service: PokemonApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonApiService],
    });

    service = TestBed.inject(PokemonApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all pokemons', () => {
    const mockPokemons = {
      count: 2,
      next: null,
      previous: null,
      results: [
        { name: 'pikachu', url: 'url' },
        { name: 'bulbasaur', url: 'url' },
      ],
    };

    service.getAllPokemons().subscribe(pokemons => {
      expect(pokemons).toEqual(mockPokemons);
    });

    const req = httpMock.expectOne(`${BASE_URL_API}?limit=200`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemons);
  });

  it('should fetch pokemon detail', () => {
    const mockPokemonDetail = {
      name: 'pikachu',
      height: 7,
      weight: 60,
      abilities: [],
      types: [],
    };

    service.getPokemonDetail('pikachu').subscribe(pokemonDetail => {
      expect(pokemonDetail).toEqual(mockPokemonDetail);
    });

    const req = httpMock.expectOne(`${BASE_URL_API}/pikachu`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemonDetail);
  });
});
