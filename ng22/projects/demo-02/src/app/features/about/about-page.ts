import { Component, inject, signal } from '@angular/core';
import { TimeService } from '../../core/services/time';

@Component({
  imports: [],
  selector: 'ind-about-page',
  styleUrl: '../pages.css',
  styles: ``,
  template: `
    <h2 id="about">{{ pageTitle() }}</h2>
    <div class="timeStamp">
      {{ timeService.getTime() }}
    </div>
  `,
})
export default class AboutPage {
  protected readonly pageTitle = signal('About');
  protected readonly timeService = inject(TimeService); // nueva forma de hacerlo
}
