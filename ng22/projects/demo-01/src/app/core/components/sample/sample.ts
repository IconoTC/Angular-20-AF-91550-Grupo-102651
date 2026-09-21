import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-sample',
  styleUrls: ['./sample.css'],
  styles: `
    :host {
      display: block;
      border: 1px solid #ccc;
      padding: 1rem;
    }
  `,
  template: ` <h2>sample component</h2> `,
  templateUrl: './sample.html',
})
export class Sample {}
