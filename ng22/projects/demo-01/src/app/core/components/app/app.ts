import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sample } from '../sample/sample';
import { CourseItem } from '../../../features/courses/components/course-item/course-item';
import { CourseItemSignals } from '../../../features/courses/components/course-item-signals/course-item-signals';
import { CourseItemPro } from '../../../features/courses/components/course-item-pro/course-item-pro';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Card } from '../card/card';
import { LogoCoders } from '../logo-coders/logo-coders';
import { Menu } from '../menu/menu';

@Component({
  imports: [
    RouterOutlet,
    Header,
    LogoCoders,
    Menu,
    Footer,
    Card,
    Sample,
    CourseItem,
    CourseItemSignals,
    CourseItemPro,
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
    <ind-header>
      <ind-logo-coders slot="left" />
      <ind-menu slot="menu" />
    </ind-header>
    <main class="container">
      <router-outlet />

      <ind-card>
        <p>Páginas de la aplicación</p>
      </ind-card>

      <ind-card>
        <ind-course-item-pro />
      </ind-card>

      <details>
        <summary>Ejemplo de componente</summary>
        <ind-sample />
      </details>
      <details>
        <summary>Otras versiones de course item</summary>
        <ind-course-item />
        <ind-course-item-signals />
      </details>
    </main>
    <ind-footer />
  `,
})
export class App {
  //protected readonly title = signal('Demo-01');
}
