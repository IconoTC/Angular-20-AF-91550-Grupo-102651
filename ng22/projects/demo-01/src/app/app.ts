import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sample } from './components/sample/sample';

@Component({
  imports: [RouterOutlet, Sample],
  selector: 'ind-root',
  styles: [],
  template: `
    <h1>{{ title() }}</h1>
    <ind-sample />
    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('Demo-01');
}
