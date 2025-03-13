import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetvrtaStavkaDekoratorComponent } from './cetvrta-stavka-dekorator.component';

describe('CetvrtaStavkaDekoratorComponent', () => {
  let component: CetvrtaStavkaDekoratorComponent;
  let fixture: ComponentFixture<CetvrtaStavkaDekoratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CetvrtaStavkaDekoratorComponent]
    });
    fixture = TestBed.createComponent(CetvrtaStavkaDekoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
