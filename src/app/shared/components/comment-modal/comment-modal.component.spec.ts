import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommentModalComponent } from './comment-modal.component';

describe('CommentModalComponent', () => {
  let component: CommentModalComponent;
  let fixture: ComponentFixture<CommentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentModalComponent, ReactiveFormsModule],
      providers: [{ provide: BsModalRef, useValue: { hide: jest.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event with form value when submit is called with valid form', () => {
    jest.spyOn(component.event, 'emit');
    jest.spyOn(component.modalRef, 'hide');
    component.form.setValue({ author: 'Test', comment: 'Test comment' });
    component.submit();
    expect(component.event.emit).toHaveBeenCalledWith({
      author: 'Test',
      comment: 'Test comment',
    });
    expect(component.modalRef.hide).toHaveBeenCalled();
  });

  it('should not emit event when submit is called with invalid form', () => {
    jest.spyOn(component.event, 'emit');
    component.form.setValue({ author: '', comment: '' });
    component.submit();
    expect(component.event.emit).not.toHaveBeenCalled();
  });
});
