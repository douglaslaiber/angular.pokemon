import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

import { CommentModalComponent } from '../../../../shared/components/comment-modal/comment-modal.component';
import { PokemonDetailsModalComponent } from '../../../../shared/components/pokemon-details-modal/pokemon-details-modal.component';
import { IPokemon } from '../../../../shared/models/pokemon.model';
import * as PokemonActions from '@store/pokemon/pokemon.actions';
import * as PokemonDetailActions from '@store/pokemon-detail/pokemon-detail.actions';
import { PokemonCommentComponent } from '../pokemon-comment/pokemon-comment.component';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [NgIcon, NgIf, PokemonCommentComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon!: IPokemon;

  @Output() favoritePokemon = new EventEmitter<string>();

  private modalService = inject(BsModalService);
  private store = inject(Store);

  clickFavorite(): void {
    this.favoritePokemon.emit(this.pokemon.name);
  }

  openDetailsModal(): void {
    this.store.dispatch(
      PokemonDetailActions.loadPokemonDetail({ pokemonName: this.pokemon.name })
    );
    const initialState: ModalOptions = {
      initialState: {
        pokemon: this.pokemon,
      },
    };

    const modalRef = this.modalService.show(
      PokemonDetailsModalComponent,
      initialState
    );
    modalRef.setClass('modal-lg');
  }

  addComment(): void {
    const initialState: ModalOptions = {
      initialState: {
        pokemonName: this.pokemon.name,
      },
    };

    const mmodalRef = this.modalService.show(
      CommentModalComponent,
      initialState
    );

    if (mmodalRef && mmodalRef.content) {
      mmodalRef.content.event.subscribe(comment => {
        this.store.dispatch(
          PokemonActions.addComment({
            pokemonName: this.pokemon.name,
            ...comment,
          })
        );
      });
    }
  }

  removeComment() {
    this.store.dispatch(
      PokemonActions.removeComment({ pokemonName: this.pokemon.name })
    );
  }
}
