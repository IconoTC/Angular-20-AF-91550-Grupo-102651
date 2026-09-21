import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemSignals } from './course-item-signals';

describe('CourseItemSignals', () => {
  let component: CourseItemSignals;
  let fixture: ComponentFixture<CourseItemSignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemSignals],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemSignals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
