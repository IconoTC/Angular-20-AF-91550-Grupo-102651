import { Component, inject, input, output, signal } from '@angular/core';
import { Course } from '../../types/course';
import { form, FormField } from '@angular/forms/signals';
import { Input } from '../../../../core/design/input/input';
import { CoursesStore } from '../../services/courses.store';

@Component({
  selector: 'ind-course-form',
  imports: [Input, FormField],
  template: `
    <form (submit)="emitCreate($event)">
        <ind-input [formField]="courseForm.title" [label]="'Title'" [type]="'text'"></ind-input>
        <ind-input [formField]="courseForm.description" [label]="'Description'" [type]="'text'"></ind-input>
        <ind-input [formField]="courseForm.duration" [label]="'Duration'" [type]="'text'"></ind-input>
        <ind-input [formField]="courseForm.level" [label]="'Level'" [type]="'text'"></ind-input>
        <ind-input [formField]="courseForm.image" [label]="'Image'" [type]="'text'"></ind-input>
        <label class="form-control checkbox" for="officialCourse">
          <input type="checkbox" id="officialCourse" 
          [formField]="courseForm.isOfficial" />
          <span>Curso oficial</span>
        </label>
      <button type="submit" [disabled]="courseForm().invalid()">Añadir curso</button>
    </form>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 80vw;
      max-width: 400px;

      .form-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &.checkbox {
          flex-direction: row;
          align-items: center;
        }
      }
    }

    input,
    textarea {
      padding: 0.5rem;
      font-size: 1rem;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: none;
      border-block-end: 2px solid var(--color-primary);
      border-radius: 4px;

      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: var(--color-background);
      background-color: var(--color-primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
        cursor: not-allowed;
      }
    }

    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
})
export class CourseForm {

  readonly store = inject(CoursesStore)

  readonly eventCreate = output<void>();
  readonly #courseInitialState: Omit<Course, 'id'> = {
    title: '',
    description: 'Añadir la descripción',
    duration: '10 horas',
    level: 'beginner',
    image: 'no image',
    isOfficial: false,
    courseStats: {
      utility: 0,
      difficulty: 0,
      actualization: 0,
    },
  };

  readonly courseData = input<Omit<Course, 'id'>>(this.#courseInitialState);
  readonly #courseModel = signal<Omit<Course, 'id'>>(this.courseData());

  protected readonly courseForm = form(this.#courseModel);

  protected emitCreate(event: Event) {
    event.preventDefault()
    this.store.addCourse(this.courseForm().value())
    this.eventCreate.emit();
    this.#courseModel.set(this.#courseInitialState);
  }
}
