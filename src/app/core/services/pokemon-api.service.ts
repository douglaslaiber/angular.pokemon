import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemonDetail } from '../../shared/models/pokemon-detail.model';
import { IFetchPokemonResponse } from '../../shared/models/pokemon.model';
import { BASE_URL_API } from '../constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  constructor(private http: HttpClient) {}

  getAllPokemons() {
    return this.http.get<IFetchPokemonResponse>(`${BASE_URL_API}?limit=200`);
  }

  getPokemonDetail(pokemonName: string) {
    return this.http.get<IPokemonDetail>(`${BASE_URL_API}/${pokemonName}`);
  }
}
