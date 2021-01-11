import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInfoComponent } from './menu-info.component';

describe('MenuInfoComponent', () => {
  let component: MenuInfoComponent;
  let fixture: ComponentFixture<MenuInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
