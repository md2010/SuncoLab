import { TestBed } from '@angular/core/testing';

import { PublicFormService } from './public-form.service';

describe('PublicFormService', () => {
  let service: PublicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
