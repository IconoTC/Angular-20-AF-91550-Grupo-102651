import { Component, signal } from '@angular/core';
import { CourseList } from './components/course-list/course-list';

@Component({
  imports: [CourseList],
  selector: 'ind-courses-page',
  styleUrl: '../pages.css',
  styles: ``,
  template: `
    <h2 id="courses">{{ pageTitle() }}</h2>
    <ind-course-list />
  `,
})
export default class CoursesPage {
  protected readonly pageTitle = signal('Courses');
}
