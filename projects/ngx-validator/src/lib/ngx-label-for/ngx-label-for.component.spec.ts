import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLabelForComponent } from './ngx-label-for.component';

describe('NgxLabelForComponent', () => {
  let component: NgxLabelForComponent;
  let fixture: ComponentFixture<NgxLabelForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxLabelForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxLabelForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
