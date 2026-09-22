import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu-option';

export const MENU_OPTIONS: MenuOption[]   = [
  { label: 'Inicio', path: '#home' },
  { label: 'Dashboard ', path: '#dashboard' },
  { label: 'Cursos', path: '#courses' },
  { label: 'Angular (about)', path: '#about' },
];

export const routes: Routes = [];
