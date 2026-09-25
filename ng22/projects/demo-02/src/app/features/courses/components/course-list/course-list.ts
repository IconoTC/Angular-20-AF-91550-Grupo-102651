/* eslint-disable no-unused-private-class-members */
import { Component, ElementRef, inject, viewChild } from '@angular/core';

import { CourseItem } from '../course-item/course-item';
import { JsonPipe } from '@angular/common';
import { CourseForm } from '../course-form/course-form';
import { CoursesStore } from '../../services/courses.store';

@Component({
  imports: [CourseItem, CourseForm, JsonPipe],
  selector: 'ind-course-list',
  styles: `
    details {
      margin-block: 1rem;
      summary::marker {
        color: var(--color-primary);
      }
    }
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  `,
  template: `
    @if (isLoading()) {
      <p>Loading courses...</p>
    } @else if (error()) {
      <p>Error loading courses: {{ error()?.message }}</p>
    } @else {
      <details #details>
        <summary>Añadir curso</summary>
        <ind-course-form (eventCreate)="addCourseClose()" />
      </details>
      <ul>
        @for (course of courses(); track course.id) {
          <li>
            <ind-course-item [course]="course" />
          </li>
        }
      </ul>

      <pre>{{ courses() | json }}</pre>
    }
  `,
})
export class CourseList {

  readonly store = inject(CoursesStore);

  protected readonly details = viewChild<ElementRef<HTMLElement>>('details');

  protected readonly courses = this.store.state.courses;
  protected readonly isLoading = this.store.state.isLoading;
  protected readonly error = this.store.state.error;

  constructor() {
    this.store.loadCourses();
  }

  protected addCourseClose() {
    (this.details()!.nativeElement as HTMLDetailsElement).open = false;
  }
}
