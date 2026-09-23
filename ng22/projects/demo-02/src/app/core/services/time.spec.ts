import { TestBed } from '@angular/core/testing';
import { TimeService } from './time';


describe('TimeService', () => {
  let service: TimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the current time in milliseconds', () => {
    const currentTime = service.getTime();
    expect(typeof currentTime).toBe('number');
    expect(currentTime).toBeGreaterThan(0);
  });
});
