import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrecaStavkaVlasnikComponent } from './treca-stavka-vlasnik.component';

describe('TrecaStavkaVlasnikComponent', () => {
  let component: TrecaStavkaVlasnikComponent;
  let fixture: ComponentFixture<TrecaStavkaVlasnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrecaStavkaVlasnikComponent]
    });
    fixture = TestBed.createComponent(TrecaStavkaVlasnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
