import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientePrincipalComponent } from './paciente-principal.component';

describe('PacientePrincipalComponent', () => {
  let component: PacientePrincipalComponent;
  let fixture: ComponentFixture<PacientePrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientePrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
