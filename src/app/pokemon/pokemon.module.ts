import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonService } from './services/pokemon.service';

import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonRoutingModule } from './pokemon-routing.module';

@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonDetailComponent,
    PokemonListComponent,
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [PokemonService],
})
export class PokemonModule {}
