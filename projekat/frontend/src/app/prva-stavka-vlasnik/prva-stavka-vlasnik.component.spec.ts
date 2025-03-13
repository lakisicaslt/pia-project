import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrvaStavkaVlasnikComponent } from './prva-stavka-vlasnik.component';

describe('PrvaStavkaVlasnikComponent', () => {
  let component: PrvaStavkaVlasnikComponent;
  let fixture: ComponentFixture<PrvaStavkaVlasnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrvaStavkaVlasnikComponent]
    });
    fixture = TestBed.createComponent(PrvaStavkaVlasnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
