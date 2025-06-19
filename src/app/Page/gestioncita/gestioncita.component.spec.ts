import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncitaComponent } from './gestioncita.component';

describe('GestioncitaComponent', () => {
  let component: GestioncitaComponent;
  let fixture: ComponentFixture<GestioncitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestioncitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioncitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
