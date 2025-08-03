import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarInformacionComponent } from './completar-informacion.component';

describe('CompletarInformacionComponent', () => {
  let component: CompletarInformacionComponent;
  let fixture: ComponentFixture<CompletarInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletarInformacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletarInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
