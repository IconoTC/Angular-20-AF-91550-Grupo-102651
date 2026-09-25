import { TestBed } from '@angular/core/testing';
import { CoursesApiRepo } from './courses.api.repo';

describe('CoursesApiRepo', () => {
  let service: CoursesApiRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesApiRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it.skip('should fetch data', () => {
    const spy = vi.spyOn(service, 'fetchData');
    service.fetchData();
    expect(spy).toHaveBeenCalled();
  });
});
