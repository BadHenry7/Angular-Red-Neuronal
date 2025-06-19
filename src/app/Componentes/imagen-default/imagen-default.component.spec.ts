import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenDefaultComponent } from './imagen-default.component';

describe('ImagenDefaultComponent', () => {
  let component: ImagenDefaultComponent;
  let fixture: ComponentFixture<ImagenDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
