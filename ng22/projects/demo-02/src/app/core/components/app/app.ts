import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { LogoCoders } from '../logo-coders/logo-coders';
import { Menu } from '../menu/menu';
import AboutPage from '../../../features/about/about-page';
import CoursesPage from '../../../features/courses/courses-page';
import DashboardPage from '../../../features/dashboard/dashboard-page';
import HomePage from '../../../features/home/home-page';
import { Card } from '../card/card';
import { MENU_OPTIONS } from '../../../app.routes';

@Component({
  imports: [
    RouterOutlet,
    Header,
    LogoCoders,
    Menu,
    Footer,
    HomePage,
    DashboardPage,
    CoursesPage,
    AboutPage,
    Card,
  ],
  selector: 'ind-root',
  styles: `
    :host {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    main.container {
      padding: 1rem 2rem;
      width: 100%;
      min-height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      position: relative;
    }
  `,
  template: `
    <ind-header [app-title]="title()" [subtitle]="subtitle()">
      <ind-logo-coders slot="left" />
      <ind-menu slot="menu" [options]="menuOptions()" />
    </ind-header>
    <main class="container">
      <router-outlet />
      <ind-card>
        <ind-home-page />
      </ind-card>
      <ind-card>
        <ind-dashboard-page />
      </ind-card>
      <ind-card>
        <ind-courses-page />
      </ind-card>
      <ind-card>
        <ind-about-page />
      </ind-card>
    </main>
    <ind-footer />
  `,
})
export class App {
  protected readonly title = signal('Curso de Angular 22');
  protected readonly subtitle = signal('Aprende a desarrollar aplicaciones con Angular');
  protected readonly menuOptions = signal(MENU_OPTIONS);
}
