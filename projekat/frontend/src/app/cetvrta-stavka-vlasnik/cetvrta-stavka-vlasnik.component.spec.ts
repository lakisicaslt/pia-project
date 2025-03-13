import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetvrtaStavkaVlasnikComponent } from './cetvrta-stavka-vlasnik.component';

describe('CetvrtaStavkaVlasnikComponent', () => {
  let component: CetvrtaStavkaVlasnikComponent;
  let fixture: ComponentFixture<CetvrtaStavkaVlasnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CetvrtaStavkaVlasnikComponent]
    });
    fixture = TestBed.createComponent(CetvrtaStavkaVlasnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
