import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteVirtualMovilComponent } from './asistente-virtual-movil.component';

describe('AsistenteVirtualMovilComponent', () => {
  let component: AsistenteVirtualMovilComponent;
  let fixture: ComponentFixture<AsistenteVirtualMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenteVirtualMovilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenteVirtualMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
