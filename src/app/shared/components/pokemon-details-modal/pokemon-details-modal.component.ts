import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';

import * as PokemonDetailSelectors from '@store/pokemon-detail/pokemon-detail.selectors';
import { IPokemonDetail } from '../../models/pokemon-detail.model';

@Component({
  selector: 'app-pokemon-details-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './pokemon-details-modal.component.html',
  styleUrl: './pokemon-details-modal.component.scss',
})
export class PokemonDetailsModalComponent implements OnInit {
  public pokemon: IPokemonDetail | null = null;

  public modalRef = inject(BsModalRef);
  private store = inject(Store);

  ngOnInit() {
    this.store
      .select(PokemonDetailSelectors.selectPokemonDetail)
      .subscribe(pokemon => {
        this.pokemon = pokemon;
      });
  }
}
