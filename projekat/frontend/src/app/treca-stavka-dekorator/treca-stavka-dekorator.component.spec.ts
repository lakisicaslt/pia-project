import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrecaStavkaDekoratorComponent } from './treca-stavka-dekorator.component';

describe('TrecaStavkaDekoratorComponent', () => {
  let component: TrecaStavkaDekoratorComponent;
  let fixture: ComponentFixture<TrecaStavkaDekoratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrecaStavkaDekoratorComponent]
    });
    fixture = TestBed.createComponent(TrecaStavkaDekoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
