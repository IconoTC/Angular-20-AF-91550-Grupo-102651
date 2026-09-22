import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-footer',
  styles: `
   :host {
      background-color: var(--color-background-primary);
      color: var(--color-primary-hot);
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 2px solid var(--color-primary);
      margin-top: 1rem;
      padding-block-start: 1rem;
      min-height: 10vh;
    }
    footer {
      text-align: center;
    }
    address {
      font-style: normal;
    }`,
  template: ` <footer>
      <address>
        <p>{{ author() }}</p>
        <p>{{ brand() }} © {{ today().getFullYear() }}</p>
      </address>
    </footer> `,
})
export class Footer {
  protected readonly author = signal('Alejandro Cerezo');
  protected readonly brand = signal('ICONO Training for Indra');
  protected readonly today = signal(new Date());
}
