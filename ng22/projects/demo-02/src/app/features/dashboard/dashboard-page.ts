import { Component, signal } from '@angular/core';
import { CountersList } from './components/counters-list/counters-list';

@Component({
  imports: [CountersList],
  selector: 'ind-dashboard-page',
  styleUrl: '../pages.css',
  styles: ``,
  template: ` 
    <h2 id="dashboard">{{ pageTitle() }}</h2> 
    <ind-counters-list />
    `,

})
export default class DashboardPage {
     protected readonly pageTitle = signal('Dashboard');
}
