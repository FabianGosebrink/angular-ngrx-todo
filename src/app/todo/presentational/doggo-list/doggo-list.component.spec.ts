import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoggoListComponent } from './doggo-list.component';

describe('DoggoListComponent', () => {
  let component: DoggoListComponent;
  let fixture: ComponentFixture<DoggoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DoggoListComponent]
    });
    fixture = TestBed.createComponent(DoggoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
