import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarMedicosComponent } from './buscar-medicos.component';

describe('BuscarMedicosComponent', () => {
  let component: BuscarMedicosComponent;
  let fixture: ComponentFixture<BuscarMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarMedicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
