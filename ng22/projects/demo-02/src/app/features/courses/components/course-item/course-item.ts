import { Component, signal, ViewEncapsulation } from '@angular/core';
import { COURSES } from '../../data/courses';

@Component({
  imports: [],
  selector: 'ind-course-item',
  encapsulation: ViewEncapsulation.Emulated,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 1rem;
      padding: 1rem;
      border: 1px solid var(--color-primary);
      border-radius: 4px;
    }
    p {
      text-align: center;
      color: var(--color-secondary);
    }
    img {
      max-width: 100%;
      height: auto;
      margin-top: 1rem;
    }
  `,
  template: `
    <h2 [title]="'ID: ' + course().id">{{ course().title.toUpperCase() }}</h2>
    <p>{{ course().description }}</p>
    <img [src]="course().image" [alt]="course().title" />
  `,
})
export class CourseItem {
  protected readonly course = signal(COURSES[0]);
}
