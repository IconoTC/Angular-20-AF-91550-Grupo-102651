import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItem } from './course-item';
import { Course } from '../../types/course';

const COURSE_MOCK: Course = {
  id: 1,
  title: 'Curso de Angular',
  description: 'Aprende Angular desde cero',
  duration: '40',
  level: 'intermediate',
  image: 'https://angular.io/assets/images/logos/angular/angular.png',
  isOfficial: true,
  courseStats: {
    utility: 5,
    actualization: 4,
    difficulty: 3,
  },
};

describe('CourseItem', () => {
  let component: CourseItem;
  let fixture: ComponentFixture<CourseItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('course', COURSE_MOCK);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
