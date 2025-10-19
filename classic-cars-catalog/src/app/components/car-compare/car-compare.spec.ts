import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCompare } from './car-compare';

describe('CarCompare', () => {
  let component: CarCompare;
  let fixture: ComponentFixture<CarCompare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCompare]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarCompare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
