import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcoLegalComponent } from './marco-legal.component';

describe('MarcoLegalComponent', () => {
  let component: MarcoLegalComponent;
  let fixture: ComponentFixture<MarcoLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcoLegalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcoLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
