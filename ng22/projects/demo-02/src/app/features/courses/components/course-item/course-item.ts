import { Component, inject, input } from '@angular/core';
import { Course } from '../../types/course';
import { CoursesStore } from '../../services/courses.store';

@Component({
  imports: [],
  selector: 'ind-course-item',
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
      max-width: 200px;
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
    <label>
      <input type="checkbox" [checked]="course().isOfficial" (change)="handleChange()" />
      <span>Curso Oficial</span>
    </label>
    <button (click)="handleDelete()">Eliminar</button>
    <img [src]="course().image" [alt]="course().title" />
  `,
})
export class CourseItem {
  readonly course = input.required<Course>();
  readonly store = inject(CoursesStore)

  handleChange() {
    const updatedCourse: Course = {
      ...this.course(),
      isOfficial: !this.course().isOfficial,
    };
    this.store.updateCourse(updatedCourse);
  }

  handleDelete() {
    this.store.deleteCourse(this.course());
  }
}
