import { delay, Observable, of, throwError } from 'rxjs';
import { Course } from '../types/course';

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Curso de Angular 22',
    description: 'Este es un curso de Angular 22',
    duration: '40 horas',
    level: 'intermediate',
    isOfficial: true,
    image: '/assets/course_angular.webp',
    courseStats: {
      utility: 7,
      difficulty: 5,
      actualization: 8,
    },
  },
  {
    id: 2,
    title: 'Curso de React 18',
    description: 'Este es un curso de React 18',
    duration: '30 horas',
    level: 'beginner',
    isOfficial: false,
    image: '/assets/course_react.webp',
    courseStats: {
      utility: 6,
      difficulty: 4,
      actualization: 7,
    },
  },
  {
    id: 3,
    title: 'Curso de Vue 3',
    description: 'Este es un curso de Vue 3',
    duration: '25 horas',
    level: 'beginner',
    isOfficial: false,
    image: '/assets/course_vue.webp',
    courseStats: {
      utility: 5,
      difficulty: 3,
      actualization: 6,
    },
  },
  {
    id: 4,
    title: 'Curso de Svelte',
    description: 'Este es un curso de Svelte',
    duration: '20 horas',
    level: 'beginner',
    isOfficial: false,
    image: '/assets/course_svelte.webp',
    courseStats: {
      utility: 4,
      difficulty: 2,
      actualization: 5,
    },
  },
  {
    id: 5,
    title: 'Curso de Node.js',
    description: 'Este es un curso de Node.js',
    duration: '35 horas',
    level: 'advanced',
    isOfficial: true,
    image: '/assets/course_node.webp',
    courseStats: {
      utility: 8,
      difficulty: 6,
      actualization: 9,
    },
  },
];

export const getMockCourses = (): Course[] => COURSES;

export const getMockCoursesAsync = async (): Promise<Course[]> => COURSES;

export const getMockCoursesRx = (isOk = true): Observable<Course[]> => {
  if (!isOk) {
    return throwError(() => new Error('Error sending courses')).pipe(delay(2000));
  }
  return of(COURSES).pipe(delay(2000));
};
