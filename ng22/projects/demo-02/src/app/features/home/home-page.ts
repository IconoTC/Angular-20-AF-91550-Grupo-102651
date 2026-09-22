import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-home-page',
  styleUrl: '../pages.css',
  styles: ``,
  template: ` <h2 id="home">{{ pageTitle() }}</h2> `,
})
export default class HomePage {
  protected readonly pageTitle = signal('Home');
}
