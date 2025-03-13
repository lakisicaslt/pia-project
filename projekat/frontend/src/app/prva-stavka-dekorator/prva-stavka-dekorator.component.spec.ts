import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrvaStavkaDekoratorComponent } from './prva-stavka-dekorator.component';

describe('PrvaStavkaDekoratorComponent', () => {
  let component: PrvaStavkaDekoratorComponent;
  let fixture: ComponentFixture<PrvaStavkaDekoratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrvaStavkaDekoratorComponent]
    });
    fixture = TestBed.createComponent(PrvaStavkaDekoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
