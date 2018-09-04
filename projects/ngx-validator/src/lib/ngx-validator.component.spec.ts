import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxValidatorDirective } from './ngx-validator.directive';

describe('NgxValidatorComponent', () => {
  let component: NgxValidatorDirective;
  let fixture: ComponentFixture<NgxValidatorDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxValidatorDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxValidatorDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
