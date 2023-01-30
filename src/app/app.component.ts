import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PokemonModel } from './model/pokemon.model';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sample-angular';
  pokemonForm: FormGroup;

  allPokemon : PokemonModel [];
  pokemonToDisplay : PokemonModel [];
  pokemonAdded: boolean = false;


  constructor(private fb: FormBuilder, private pokemonService : PokemonService ) {
    this.pokemonForm = fb.group({});
    this.allPokemon = [];
    this.pokemonToDisplay = [];
  }

  ngOnInit(): void {
      this.pokemonForm = this.fb.group({
        name: this.fb.control(''),
        id: this.fb.control(null),
        power: this.fb.control(''),
      });
      
      this.pokemonService.getPokemons().subscribe(response => {
        this.allPokemon = response;
      });
  }

  clearForm() {
    this.Name.setValue('');
    this.Power.setValue('');
    this.Id.setValue(0);
  }

  getImageId(id: number): string {
    if(id<10) return ("00" + id);
    else if(id<100) return ("0" + id);
    else return String(id);
  }

  addPokemon() {
    const pokemon: PokemonModel = {
      id: this.Id.value,
      name: this.Name.value,
      power: this.Power.value,
      imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.getImageId(this.Id.value)}.png`
    }
    this.savePokemon(pokemon).subscribe(response => {
      this.allPokemon.push(response);
      this.pokemonAdded = true;
      this.clearForm();
    });
  }

  removeSuccessAlert() {
    this.pokemonAdded = false;
  }

  savePokemon(pokemon: PokemonModel) {
    return this.pokemonService.postPokemons(pokemon);
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
