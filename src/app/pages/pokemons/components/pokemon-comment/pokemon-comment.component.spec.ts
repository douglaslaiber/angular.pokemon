import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCommentComponent } from './pokemon-comment.component';

describe('PokemonCommentComponent', () => {
  let component: PokemonCommentComponent;
  let fixture: ComponentFixture<PokemonCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addComment event when add method is called', () => {
    jest.spyOn(component.addComment, 'emit');
    component.add();
    expect(component.addComment.emit).toHaveBeenCalled();
  });

  it('should emit removeComment event when remove method is called', () => {
    jest.spyOn(component.removeComment, 'emit');
    component.remove();
    expect(component.removeComment.emit).toHaveBeenCalled();
  });
});
