import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugaStavkaVlasnikComponent } from './druga-stavka-vlasnik.component';

describe('DrugaStavkaVlasnikComponent', () => {
  let component: DrugaStavkaVlasnikComponent;
  let fixture: ComponentFixture<DrugaStavkaVlasnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrugaStavkaVlasnikComponent]
    });
    fixture = TestBed.createComponent(DrugaStavkaVlasnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
