import { Component, signal } from '@angular/core';
import { Info } from './components/info/info';
import { Card } from '../../core/components/card/card';

@Component({
  imports: [Info, Card],
  selector: 'ind-home-page',
  styleUrl: '../pages.css',
  styles: ``,
  template: `
    <h2 id="home">{{ pageTitle() }}</h2>
    <ind-card>
      <ind-info />
    </ind-card>
  `,
})
export default class HomePage {
  protected readonly pageTitle = signal('Home');
}
