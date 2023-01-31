import { Component, Input } from '@angular/core';
import { PokemonModel } from './../model/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  @Input() pokemons: PokemonModel[];

  constructor() {
    this.pokemons = [];
  }
}
