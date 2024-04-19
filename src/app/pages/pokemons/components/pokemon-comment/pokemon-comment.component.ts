import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IPokemonComment } from '../../../../shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-comment',
  standalone: true,
  imports: [NgIf],
  templateUrl: './pokemon-comment.component.html',
  styleUrl: './pokemon-comment.component.scss',
})
export class PokemonCommentComponent {
  @Input() comment!: IPokemonComment | null;

  @Output() addComment = new EventEmitter<void>();
  @Output() removeComment = new EventEmitter<void>();

  add() {
    this.addComment.emit();
  }

  remove() {
    this.removeComment.emit();
  }
}
