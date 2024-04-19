import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';
import {
  heroEye,
  heroMagnifyingGlass,
  heroStar,
} from '@ng-icons/heroicons/outline';
import { heroStarSolid } from '@ng-icons/heroicons/solid';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, ReactiveFormsModule],
      providers: [
        provideIcons({ heroStar, heroStarSolid, heroMagnifyingGlass, heroEye }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event on value change', done => {
    component.search.subscribe(value => {
      expect(value).toBe('test');
      done();
    });

    component.valueSearchControl.setValue('test');
  });
});
