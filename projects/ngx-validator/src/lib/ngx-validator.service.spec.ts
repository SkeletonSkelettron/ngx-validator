import { TestBed, inject } from '@angular/core/testing';

import { NgxValidatorService } from './ngx-validator.service';

describe('NgxValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxValidatorService]
    });
  });

  it('should be created', inject([NgxValidatorService], (service: NgxValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
