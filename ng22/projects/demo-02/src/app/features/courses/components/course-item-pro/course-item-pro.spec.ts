import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemPro } from './course-item-pro';
import { By } from '@angular/platform-browser';

describe('CourseItemPro', () => {
  let component: CourseItemPro;
  let fixture: ComponentFixture<CourseItemPro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemPro],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemPro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the course when changeCourse is called', async () => {
    const initialCourseStats = { ...component['course']().courseStats };
    component['changeStats']('utility');
    await fixture.whenStable();
    const newCourse = component['course']();
    expect(newCourse.courseStats).not.toEqual(initialCourseStats);
  });

  it('should change the course utility when button is clicked', async () => {
    const initialCourseStats = { ...component['course']().courseStats };
    const button = fixture.nativeElement.querySelector(
      '.course-courseStats-buttons button:nth-child(2)',
    );
    button.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const newCourse = component['course']();
    console.log('New Course:', newCourse);
    expect(newCourse.courseStats.utility).toBe(initialCourseStats.utility + 1);
  });

  it('should change the course difficulty when button is clicked', async () => {
    const initialCourseStats = { ...component['course']().courseStats };
    const buttons = fixture.nativeElement.querySelectorAll('.course-courseStats-buttons button');
    buttons[4].dispatchEvent(new Event('click'));
    fixture.detectChanges();
    await fixture.whenStable();
    const newCourse = component['course']();
    console.log('New Course:', newCourse);
    expect(newCourse.courseStats.difficulty).toBe(initialCourseStats.difficulty + 1);
  });

  it('should change the course actualization when button is clicked', async () => {
    //const initialCourseStats = { ...component['course']().courseStats };
    const buttons = fixture.debugElement.queryAll(By.css('.course-courseStats-buttons button'));
    buttons[8].triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();
    const newCourse = component['course']();
    console.log('New Course:', newCourse);
    expect(newCourse.courseStats.actualization).toBe(0);
  });
});
