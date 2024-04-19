import { Component, EventEmitter, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { IPokemonComment } from '../../models/pokemon.model';

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.scss',
})
export class CommentModalComponent {
  public form = new UntypedFormGroup({
    author: new UntypedFormControl('', Validators.required),
    comment: new UntypedFormControl('', Validators.required),
  });
  public event: EventEmitter<IPokemonComment> = new EventEmitter();

  public modalRef = inject(BsModalRef);

  get author() {
    return this.form.get('author');
  }
  get comment() {
    return this.form.get('comment');
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.event.emit(this.form.value);
    this.modalRef.hide();
  }
}
