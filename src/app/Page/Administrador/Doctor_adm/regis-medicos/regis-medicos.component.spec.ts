import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisMedicosComponent } from './regis-medicos.component';

describe('RegisMedicosComponent', () => {
  let component: RegisMedicosComponent;
  let fixture: ComponentFixture<RegisMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisMedicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
