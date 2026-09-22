import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-dashboard-page',
  styleUrl: '../pages.css',
  styles: ``,
  template: ` <h2 id="dashboard">{{ pageTitle() }}</h2> `,

})
export default class DashboardPage {
     protected readonly pageTitle = signal('Dashboard');
}
