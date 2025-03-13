import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugaStavkaDekoratorComponent } from './druga-stavka-dekorator.component';

describe('DrugaStavkaDekoratorComponent', () => {
  let component: DrugaStavkaDekoratorComponent;
  let fixture: ComponentFixture<DrugaStavkaDekoratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrugaStavkaDekoratorComponent]
    });
    fixture = TestBed.createComponent(DrugaStavkaDekoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
