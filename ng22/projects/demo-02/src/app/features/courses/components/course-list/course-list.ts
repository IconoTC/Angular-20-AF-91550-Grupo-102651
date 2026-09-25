/* eslint-disable no-unused-private-class-members */
import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Course } from '../../types/course';
import { getMockCoursesAsync } from '../../data/courses';
import { CourseItem } from '../course-item/course-item';
import { JsonPipe } from '@angular/common';
import { CourseForm } from '../course-form/course-form';
import { CoursesApiRepo } from '../../services/courses.api.repo';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        <ind-course-form (eventCreate)="addCourse($event)" />
      </details>
      <ul>
        @for (course of courses(); track course.id) {
          <li>
            <ind-course-item
              [course]="course"
              (changeEvent)="updateCourse($event)"
              (deleteEvent)="deleteCourse($event)"
            />
          </li>
        }
      </ul>

      <pre>{{ courses() | json }}</pre>
    }
  `,
})
export class CourseList {
  readonly #repo = inject(CoursesApiRepo);
  readonly #destroyRef = inject(DestroyRef);

  protected readonly details = viewChild<ElementRef<HTMLElement>>('details');

  protected readonly courses = signal<Course[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<Error | null>(null);

  constructor() {
    this.#loadCoursesRx();
  }

  async #loadCourses() {
    const courses = await getMockCoursesAsync();
    this.courses.set(courses);
  }

  #loadCoursesRx() {
    this.isLoading.set(true);
    this.error.set(null);
    this.#repo
      .getAll()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (courses) => this.courses.set(courses),
        error: (err) => {
          console.error(err);
          this.error.set(err);
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  protected addCourse(courseData: Omit<Course, 'id'>) {
    // Asíncrono
    this.#repo
      .add(courseData)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((course) => {
        // Sincrona: State
        this.courses.update((courses) => [...courses, { ...course, id: Date.now() }]);
        (this.details()!.nativeElement as HTMLDetailsElement).open = false;
      });
  }

  protected updateCourse(courseData: Course) {
    const { id, ...data } = courseData;
    // Asíncrono
    this.#repo
      .update(id, data)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((course) => {
        const updatedCourses = this.courses().map((c) => (c.id === course.id ? course : c));
        this.courses.set(updatedCourses);
      });
  }

  protected deleteCourse(course: Course) {
    this.#repo
      .delete(course.id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        const updatedCourses = this.courses().filter((c) => c.id !== course.id);
        this.courses.set(updatedCourses);
      });
  }
}
