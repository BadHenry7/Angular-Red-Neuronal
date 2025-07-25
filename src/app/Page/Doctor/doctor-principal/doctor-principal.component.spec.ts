import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPrincipalComponent } from './doctor-principal.component';

describe('DoctorPrincipalComponent', () => {
  let component: DoctorPrincipalComponent;
  let fixture: ComponentFixture<DoctorPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
