import { DestroyRef, inject, Service, signal } from '@angular/core';
import { Course } from '../types/course';
import { CoursesApiRepo } from './courses.api.repo';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Service()
export class CoursesStore {
  readonly #repo = inject(CoursesApiRepo);
  readonly #destroyRef = inject(DestroyRef);

  readonly #courses = signal<Course[]>([]);
  readonly #isLoading = signal(false);
  readonly #error = signal<Error | null>(null);

  readonly state = {
    courses: this.#courses.asReadonly(),
    isLoading: this.#isLoading.asReadonly(),
    error: this.#error.asReadonly(),
  };

  loadCourses() {
    this.#isLoading.set(true);
    this.#error.set(null);
    this.#repo
      .getAll()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (courses) => this.#courses.set(courses),
        error: (err) => {
          console.error(err);
          this.#error.set(err);
          this.#isLoading.set(false);
        },
        complete: () => {
          this.#isLoading.set(false);
        },
      });
    }

  addCourse(courseData: Omit<Course, 'id'>) {
    this.#repo
      .add(courseData)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((course) => {
        this.#courses.update((courses) => [...courses, course]);
      });
  }

  updateCourse(courseData: Course) {
    const { id, ...data } = courseData;
    this.#repo
      .update(id, data)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((course) => {
        this.#courses.update((courses) =>
          courses.map((c) => (c.id === course.id ? { ...c, ...course } : c))
        );
      });
  }

  deleteCourse(course: Course) {
    this.#repo
      .delete(course.id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.#courses.update((courses) => courses.filter((c) => c.id !== course.id));
      });
  } 
}
