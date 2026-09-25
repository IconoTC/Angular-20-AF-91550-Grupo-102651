import { Component, input, output } from '@angular/core';
import { Course } from '../../types/course';

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
      <input type="checkbox" [checked]="course().isOfficial" (change)="handleChangeEmit()" />
      <span>Curso Oficial</span>
    </label>
    <button (click)="handleDeleteEmit()">Eliminar</button>
    <img [src]="course().image" [alt]="course().title" />
  `,
})
export class CourseItem {
  readonly course = input.required<Course>();

  protected readonly changeEvent = output<Course>();
  protected readonly deleteEvent = output<Course>();

  handleChangeEmit() {
    const updatedCourse: Course = {
      ...this.course(),
      isOfficial: !this.course().isOfficial,
    };
    this.changeEvent.emit(updatedCourse);
  }

  handleDeleteEmit() {
    this.deleteEvent.emit(this.course());
  }
}
