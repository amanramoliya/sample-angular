import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonModel } from '../../model/pokemon.model';
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
  idError: boolean = false;
  powerError: boolean = false;
  page: number;
  pageSize: number;
  collectionSize: number;
  closeResult = '';
  queryPokemonName: string | null = '';

  pokemon: PokemonModel = new PokemonModel();

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.pokemonForm = fb.group({});
    this.allPokemon = [];
    this.pokemonToDisplay = [];
    this.page = 1;
    this.pageSize = 9;
    this.collectionSize = this.allPokemon.length;
    this.queryPokemonName = this.route.snapshot.paramMap.get('name');
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
        this.collectionSize = this.allPokemon.length;

        this.queryPokemonName && this.filterPokemon();
        this.queryPokemonName &&
          (this.collectionSize = this.pokemonToDisplay.length);
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

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${{ result }}`;
          // console.log(result);
        },
        (reason) => {
          this.closeResult = `Dismissed ${{ reason }}`;
        }
      );
  }

  filterPokemon() {
    this.pokemonToDisplay = this.allPokemon.filter((p) =>
      p.name
        .toLowerCase()
        .startsWith(
          this.queryPokemonName?.toLowerCase() ? this.queryPokemonName : ''
        )
    );
    console.log(this.allPokemon);
  }

  getImageId(id: number): string {
    if (id < 10) return '00' + id;
    else if (id < 100) return '0' + id;
    else return String(id);
  }

  addPokemon(modal: NgbActiveModal) {
    modal.close();
    (this.pokemon.id = this.Id.value),
      (this.pokemon.name = this.Name.value),
      (this.pokemon.power = this.Power.value),
      (this.pokemon.imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.getImageId(
        this.Id.value
      )}.png`);

    this.savePokemon(this.pokemon).subscribe({
      next: (response) => {
        this.pokemonToDisplay.unshift(response);

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

  validateId() {
    this.idError = this.Id.invalid;
  }

  validatePower() {
    this.powerError = this.Power.invalid;
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
