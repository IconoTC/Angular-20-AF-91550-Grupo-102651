import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu-option';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home-page'),
    title: 'Home | Demo 02',
    data: {
      label: 'Inicio',
    },
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard-page'),
    title: 'Dashboard | Demo 02',
    data: {
      label: 'Dashboard',
    }
  },
  {
    path: 'courses',
   loadComponent: () => import('./features/courses/courses-page'),
    title: 'Courses | Demo 02',
    data: {
      label: 'Cursos',
    } 
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about-page'),
    title: 'About | Demo 02',
    data: {
      label: 'Angular (about)',
    }
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];



export const MENU_OPTIONS: MenuOption[]   = routes
  .filter(route => route.data?.['label'])
  .map(route => ({
    label: route.data!['label'] as string,
    path: route.path as string
  }));