import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotciComponent } from './botci.component';

describe('BotciComponent', () => {
  let component: BotciComponent;
  let fixture: ComponentFixture<BotciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotciComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
