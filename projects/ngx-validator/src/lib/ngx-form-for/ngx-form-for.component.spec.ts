import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormForComponent } from './ngx-form-for.component';

describe('NgxFormForComponent', () => {
  let component: NgxFormForComponent;
  let fixture: ComponentFixture<NgxFormForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFormForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
