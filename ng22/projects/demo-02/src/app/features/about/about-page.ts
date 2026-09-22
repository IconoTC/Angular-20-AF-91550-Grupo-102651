import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-about-page',
  styleUrl: '../pages.css',
  styles: ``,
  template: ` <h2 id="about">{{ pageTitle() }}</h2> `,
})
export default class AboutPage {
  protected readonly pageTitle = signal('About');
}
