import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonModel } from '../../model/pokemon.model';
import { environment } from './../../../environments/environment';

@Injectable()
export class PokemonService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getPokemons() {
    return this.http.get<PokemonModel[]>(this.baseUrl);
  }

  postPokemons(pokemon: PokemonModel) {
    return this.http.post<PokemonModel>(this.baseUrl, pokemon);
  }

  getPokemon(id: number | string) {
    return this.http.get<PokemonModel>(this.baseUrl + `/${id}`);
  }
}
