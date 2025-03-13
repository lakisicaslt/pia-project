import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposliComponent } from './zaposli.component';

describe('ZaposliComponent', () => {
  let component: ZaposliComponent;
  let fixture: ComponentFixture<ZaposliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZaposliComponent]
    });
    fixture = TestBed.createComponent(ZaposliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
