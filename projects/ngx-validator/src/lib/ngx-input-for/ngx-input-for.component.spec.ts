import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInputForComponent } from './ngx-input-for.component';

describe('NgxInputForComponent', () => {
  let component: NgxInputForComponent;
  let fixture: ComponentFixture<NgxInputForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxInputForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxInputForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
