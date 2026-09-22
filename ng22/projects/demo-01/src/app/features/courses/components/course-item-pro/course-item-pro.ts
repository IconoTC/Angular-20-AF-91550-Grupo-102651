import { Component, computed, signal } from '@angular/core';
import { COURSES } from '../../data/courses';
import { Course } from '../../types/course';

const STAT_MIN = 0;
const STAT_MAX = 10;

@Component({
  imports: [],
  selector: 'ind-course-item-pro',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    img {
      max-width: 100%;
      height: auto;
      margin-top: 1rem;
    }
  `,
  template: `
    <img [src]="course().image" [alt]="course().title" />
    <h2 [title]="'ID: ' + course().id">{{ course().title + ' PRO' }}</h2>
    <section class="details">
      <p>{{ course().description }}</p>
      <p>Duración: {{ course().duration }}</p>
      <p>Nivel: {{ course().level }}</p>
    </section>
    <section class="stats">
      <div class="course-stats" aria-label="Utilidad">
        <span
          >Utilidad: <output>{{ course().courseStats.utility }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            title="Disminuir utilidad en 1"
            [disabled]="course().courseStats.utility <= statMin"
            (click)="changeStats('utility', -1)"
          >
            ➖
          </button>
          <button
            title="Aumentar utilidad en 1"
            [disabled]="course().courseStats.utility >= statMax"
            (click)="changeStats('utility')"
          >
            ➕
          </button>
          <button
            title="Reset utilidad a 0"
            [disabled]="course().courseStats.utility === statMin"
            (click)="changeStats('utility', 0)"
          >
            🔄️
          </button>
        </div>
      </div>
      <div class="course-stats" aria-label="Dificultad">
        <span
          >Dificultad: <output>{{ course().courseStats.difficulty }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            [disabled]="course().courseStats.difficulty === statMin"
            (click)="changeStats('difficulty', -1)"
          >
            ➖
          </button>
          <button
            [disabled]="course().courseStats.difficulty === statMax"
            (click)="changeStats('difficulty')"
          >
            ➕
          </button>
          <button
            [disabled]="course().courseStats.difficulty === 0"
            (click)="changeStats('difficulty', 0)"
            [title]="'Reset ' + 'difficulty' + ' a 0'"
          >
            🔄
          </button>
        </div>
      </div>
      <div class="course-stats" aria-label="Actualidad">
        <span
          >Actualidad: <output>{{ course().courseStats.actualization }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            [disabled]="course().courseStats.actualization === statMin"
            (click)="changeStats('actualization', -1)"
          >
            ➖
          </button>
          <button
            [disabled]="course().courseStats.actualization === statMax"
            (click)="changeStats('actualization')"
          >
            ➕
          </button>
          <button
            [disabled]="course().courseStats.actualization === 0"
            (click)="changeStats('actualization', 0)"
            [title]="'Reset ' + 'actualidad' + ' a 0'"
          >
            🔄
          </button>
        </div>
      </div>
    </section>

    <div class="course-stats" aria-label="Utilidad">
      <span
        >Media: <output>{{ averageStats() }}</output></span
      >
      <div></div>
    </div>
  `,
})
export class CourseItemPro {
  protected readonly course = signal(COURSES[0]);
  protected readonly statMin = STAT_MIN;
  protected readonly statMax = STAT_MAX;

  protected averageStats = computed(() => {
    const total =
      this.course().courseStats.utility +
      this.course().courseStats.difficulty +
      this.course().courseStats.actualization;
    return (total / 3).toFixed(2);
    //const stats = this.course().courseStats;
    //const total = Object.values(stats).reduce((acc, stat) => acc + stat, 0);
    //return total / Object.keys(stats).length;
  });

  protected changeStats(stat: keyof Course['courseStats'], value = 1): void {
    this.course.update((course) => {
      if (value === 0) {
        course.courseStats[stat] = 0;
      } else {
        course.courseStats[stat] += value;
      }
      return { ...course };
    });
  }
}
