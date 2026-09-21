import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sample } from '../sample/sample';
import { CourseItem } from '../../../features/courses/components/course-item/course-item';
import { CourseItemSignals } from '../../../features/courses/components/course-item-signals/course-item-signals';

@Component({
  imports: [RouterOutlet, Sample, CourseItem, CourseItemSignals],
  selector: 'ind-root',
  styles: [],
  template: `
    <h1>{{ title() }}</h1>
    <p>Welcome to the demo-01 application!</p>
    <ind-sample />
    <ind-course-item />
    <ind-course-item-signals />
    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('Demo-01');
}
