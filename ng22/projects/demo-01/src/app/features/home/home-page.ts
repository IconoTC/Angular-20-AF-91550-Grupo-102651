import { Component, signal } from '@angular/core';
import { Sample } from '../../core/components/sample/sample';

@Component({
  imports: [Sample],
  selector: 'ind-home-page',
  styleUrl: '../pages.css',
  styles: ``,
  template: `
    <h2 id="home">{{ pageTitle() }}</h2>

    <details>
      <summary>Ejemplo de componente</summary>
      <ind-sample />
    </details>
  `,
})
export default class HomePage {
  protected readonly pageTitle = signal('Home');
}
