import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesMedicoComponent } from './reportes-medico.component';

describe('ReportesMedicoComponent', () => {
  let component: ReportesMedicoComponent;
  let fixture: ComponentFixture<ReportesMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
