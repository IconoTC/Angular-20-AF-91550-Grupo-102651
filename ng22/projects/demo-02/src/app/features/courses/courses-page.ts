import { Component, signal } from '@angular/core';
import { CourseItem } from './components/course-item/course-item';
import { CourseItemPro } from './components/course-item-pro/course-item-pro';
import { Card } from '../../core/components/card/card';

@Component({
  imports: [Card, CourseItem, CourseItemPro],
  selector: 'ind-courses-page',
  styleUrl: '../pages.css',
  styles: ``,
  template: `
    <h2 id="courses">{{ pageTitle() }}</h2>
    <ind-card>
      <ind-course-item-pro />
    </ind-card>
    <details>
      <summary>Otras versiones de course item</summary>
      <ind-course-item />
    </details>
  `,
})
export default class CoursesPage {
  protected readonly pageTitle = signal('Courses');
}
