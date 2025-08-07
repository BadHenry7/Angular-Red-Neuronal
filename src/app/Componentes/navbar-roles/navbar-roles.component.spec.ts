import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRolesComponent } from './navbar-roles.component';

describe('NavbarRolesComponent', () => {
  let component: NavbarRolesComponent;
  let fixture: ComponentFixture<NavbarRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
