import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonPrettyDialogComponent } from './json-pretty-dialog.component';

describe('JsonPrettyDialogComponent', () => {
  let component: JsonPrettyDialogComponent;
  let fixture: ComponentFixture<JsonPrettyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonPrettyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonPrettyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
