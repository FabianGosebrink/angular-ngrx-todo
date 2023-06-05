import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { DoggoMainComponent } from './doggo-main.component';

describe('DoggoMainComponent', () => {
  let component: DoggoMainComponent;
  let fixture: ComponentFixture<DoggoMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DoggoMainComponent, HttpClientModule],
    });
    fixture = TestBed.createComponent(DoggoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
