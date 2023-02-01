import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonModel } from '../../model/pokemon.model';

@Injectable()
export class PokemonService {
  baseUrl = 'http://localhost:3000/pokemon';
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
