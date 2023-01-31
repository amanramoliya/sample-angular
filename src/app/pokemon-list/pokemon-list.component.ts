import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PokemonModel } from '../model/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  pokemonForm: FormGroup;

  allPokemon: PokemonModel[];
  pokemonToDisplay: PokemonModel[];
  pokemonAdded: boolean = false;
  Error: string = 'No pokemon';
  isError: boolean = false;
  nameError: boolean = false;
  page: number;
  pageSize: number;
  collectionSize: number;

  pokemon: PokemonModel = new PokemonModel();
  constructor(private fb: FormBuilder, private pokemonService: PokemonService) {
    this.pokemonForm = fb.group({});
    this.allPokemon = [];
    this.pokemonToDisplay = [];
    this.page = 1;
    this.pageSize = 9;
    this.collectionSize = this.allPokemon.length;
  }

  ngOnInit(): void {
    this.pokemonForm = this.fb.group({
      name: this.fb.control(this.pokemon.name, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      id: this.fb.control(null, [Validators.required]),
      power: this.fb.control('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
    });

    this.pokemonService.getPokemons().subscribe({
      next: (response) => {
        this.allPokemon = response;
        this.collectionSize = this.allPokemon.length;
        this.refreshPokemons();
      },

      error: (err) => {
        this.Error = err.message;
        this.isError = true;
        console.log(this.Error);
      },
    });
  }

  clearForm() {
    this.Name.setValue('');
    this.Power.setValue('');
    this.Id.setValue(0);
  }

  getImageId(id: number): string {
    if (id < 10) return '00' + id;
    else if (id < 100) return '0' + id;
    else return String(id);
  }

  addPokemon() {
    (this.pokemon.id = this.Id.value),
      (this.pokemon.name = this.Name.value),
      (this.pokemon.power = this.Power.value),
      (this.pokemon.imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.getImageId(
        this.Id.value
      )}.png`);

    this.savePokemon(this.pokemon).subscribe({
      next: (response) => {
        this.allPokemon.unshift(response);

        this.clearForm();
        this.pokemonAdded = true;
      },
      error: (err) => {
        this.Error = err.message;
        this.isError = true;
        console.log(this.isError);
      },
    });
  }

  refreshPokemons() {
    this.pokemonToDisplay = this.allPokemon.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
    console.log(this.allPokemon);
  }

  removeSuccessAlert() {
    this.pokemonAdded = false;
  }

  removeErrorAlert() {
    this.Error = '';
    this.isError = false;
  }

  savePokemon(pokemon: PokemonModel) {
    return this.pokemonService.postPokemons(pokemon);
  }

  validateName() {
    this.nameError = this.Name.invalid;
  }

  public get Name(): FormControl {
    return this.pokemonForm.get('name') as FormControl;
  }

  public get Power(): FormControl {
    return this.pokemonForm.get('power') as FormControl;
  }

  public get Id(): FormControl {
    return this.pokemonForm.get('id') as FormControl;
  }
}
