import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonModel } from '../../model/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: PokemonModel;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pokemonService: PokemonService
  ) {
    this.pokemon = new PokemonModel();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.pokemonService.getPokemon(this.id).subscribe({
      next: (response) => {
        this.pokemon = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
