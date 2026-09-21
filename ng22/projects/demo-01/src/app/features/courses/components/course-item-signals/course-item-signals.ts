import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { COURSES } from '../../../data/courses';

@Component({
  imports: [],
  selector: 'ind-course-item-signals',
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
      h2, h3 {
        margin: 0;
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
    <h2 [title]=" 'ID: ' + course().id ">{{ course().title.toUpperCase() }}</h2>
    <h3>{{ plainText }}</h3>
    <p>{{ course().description }}</p>
    <img [src]="course().image" [alt]="course().title " />
  `,
})
export class CourseItemSignals {
    protected readonly course = signal(COURSES[0]);
    protected plainText = "Esto es un texto plano"

    constructor() {
      console.log('Constructor')
      setTimeout(() => {
        this.plainText = "Esto es un texto plano modificado";
        console.log(this.plainText)
      }, 300);
      setTimeout(() => {
        // this.course.set(
        //   {
        //     ...COURSES[0],
        //     title: 'Curso de Angular con Signals',  
        //   }
        // );
        this.course.update((course) => ({
          ...course,
          title: 'Curso de Angular con Signals',
        }));
      }, 3000);
    }
}
