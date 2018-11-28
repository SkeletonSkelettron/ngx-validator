import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormForReactiveComponent } from './ngx-form-for-reactive.component';

describe('NgxFormForReactiveComponent', () => {
  let component: NgxFormForReactiveComponent;
  let fixture: ComponentFixture<NgxFormForReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFormForReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormForReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
