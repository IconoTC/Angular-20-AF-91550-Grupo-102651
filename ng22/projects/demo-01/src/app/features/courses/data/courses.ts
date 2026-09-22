import { Course } from '../types/course';

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Curso de Angular 22',
    description: 'Este es un curso de Angular 22',
    duration: '40 horas',
    level: 'intermediate',
    image: '/assets/course_angular.webp',
    courseStats: {
      utility: 7,
      difficulty: 5,
      actualization: 8,
    },
  },
];
