import { ComponentFixture, TestBed } from '@angular/core/testing';
import CoursesPage from './courses-page';
import { CourseItemPro } from './components/course-item-pro/course-item-pro';
import { CourseItemSignals } from './components/course-item-signals/course-item-signals';
import { CourseItem } from './components/course-item/course-item';
import { By } from '@angular/platform-browser';

describe('CoursesPage', () => {
  let component: CoursesPage;
  let fixture: ComponentFixture<CoursesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the page title', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('#courses')?.textContent).toContain('Courses');
  });

  it('should render the course item components', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('ind-course-item')).toBeTruthy();
    expect(element.querySelector('ind-course-item-signals')).toBeTruthy();
    expect(element.querySelector('ind-course-item-pro')).toBeTruthy();
  });

    it('should render the course item components (debugElement)', () => {
    const debugElement = fixture.debugElement;
    expect(debugElement.query(By.directive(CourseItem))).toBeTruthy();
    expect(debugElement.query(By.directive(CourseItemSignals))).toBeTruthy();
    expect(debugElement.query(By.directive(CourseItemPro))).toBeTruthy();
  });
});
