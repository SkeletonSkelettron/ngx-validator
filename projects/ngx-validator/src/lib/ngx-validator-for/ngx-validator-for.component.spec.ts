import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxValidatorForComponent } from './ngx-validator-for.component';

describe('NgxValidatorForComponent', () => {
  let component: NgxValidatorForComponent;
  let fixture: ComponentFixture<NgxValidatorForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxValidatorForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxValidatorForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
